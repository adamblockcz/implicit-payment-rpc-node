import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, Box, Modal, Paper } from '@mui/material';
import { encodeFunctionData } from 'viem';
import { waitForTransactionReceipt } from '@wagmi/core';
import { useWriteContract } from 'wagmi';
import { config } from '@/components/Web3ModalProvider';
import { ABI as RpcGoAbi } from '@/abi/RpcGoABI';
import { styled } from "@mui/material/styles";
import { ABI as ERC20GoAbi } from '@/abi/ERC20ABI';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

const TransactionForm: React.FC = () => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [value, setValue] = useState<string>('');
  const [contractAddress, setContractAddress] = useState<string>('');
  const [functionDeclaration, setFunctionDeclaration] = useState<string>('');
  const [args, setArgs] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [verificationPassed, setVerificationPassed] = useState<boolean>(false);
  const { writeContractAsync } = useWriteContract();

  const parseFunctionDeclaration = (declaration: string) => {
    const trimmedDeclaration = declaration.trim(); // Trim whitespace
    const regex = /^function\s+(\w+)\((.*?)\)$/;
    const match = trimmedDeclaration.match(regex);
    if (match) {
      const [, functionName, params] = match;
      const args = params.split(',').map(arg => arg.trim());
      setFunctionDeclaration(trimmedDeclaration); // Save trimmed declaration
      setArgs(args);
      setVerificationPassed(true);
    } else {
      setModalOpen(true);
    }
  };

  const handleSubmit = async () => {
    const abiItem = constructAbiItem(functionDeclaration);
    const encodedParameters = encodeFunctionData({
      abi: [abiItem],
      functionName: abiItem.name,
      args: args.map(arg => formData[arg]),
    });

    const valueInWei = BigInt((parseFloat(value) * 10**18).toString());

    const result = await writeContractAsync({
      abi: RpcGoAbi,
      address: process.env.NEXT_PUBLIC_RPC_GO_CONTRACT_ADDRESS,
      functionName: 'submitTransaction',
      value: valueInWei,
      args: [contractAddress, 0, encodedParameters],
    });
    const resultReceipt = await waitForTransactionReceipt(config, {
      hash: result,
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    setFormData({ ...formData, [fieldName]: event.target.value });
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleVerify = () => {
    parseFunctionDeclaration(functionDeclaration);
  };

  const handleFunctionDeclarationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFunctionDeclaration(event.target.value);
    setVerificationPassed(false);
    setArgs([]);
  };

  const constructAbiItem = (declaration: string) => {
    // Construct the ABI item dynamically based on the function declaration
    const regex = /^function\s+(\w+)\((.*?)\)$/;
    const match = declaration.match(regex);
    if (match) {
      const [, functionName, params] = match;
      const args = params.split(',').map(arg => arg.trim());
      return {
        inputs: args.map(arg => ({ name: arg.split(' ')[1], type: arg.split(' ')[0] })),
        name: functionName,
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      };
    } else {
      throw new Error("Invalid function declaration format");
    }
  };

  return (
    <Box sx={{ flexGrow: 1}}>
      <Grid container spacing={2} justifyContent="center" >
        
        <Grid xs={6} alignItems="center" marginTop="15vh">
         <Item>
          <Typography variant="h6" align="center">Process Transaction</Typography>
          <TextField
            label="Value (ETH)"
            variant="outlined"
            value={value}
            onChange={handleValueChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contract Address"
            variant="outlined"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Function Declaration"
            variant="outlined"
            value={functionDeclaration}
            onChange={handleFunctionDeclarationChange}
            fullWidth
            margin="normal"
          />
          {verificationPassed && args.map((arg, index) => (
            <TextField
              key={index}
              label={`${arg}`}
              variant="outlined"
              value={formData[arg] || ''}
              onChange={(e) => handleInputChange(e, arg)}
              fullWidth
              margin="normal"
            />
          ))}
          <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}>
            {verificationPassed ? (
              <Button variant="contained" onClick={handleSubmit}>Submit Transaction</Button>
            ) : (
              <Button variant="contained" onClick={handleVerify}>Verify</Button>
            )}
          </Box>
          </Item>
        </Grid>
      </Grid>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="verification-failure-modal"
        aria-describedby="modal-explanation"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography id="verification-failure-modal" variant="h6" component="h2" gutterBottom>
            Verification Failed
          </Typography>
          <Typography id="modal-explanation" variant="body1" gutterBottom>
            The function declaration should be in the format: "function functionName(argumentType1 argumentName1, argumentType2 argumentName2, ...)"
          </Typography>
          <Button onClick={() => setModalOpen(false)} variant="contained">Close</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default TransactionForm;
