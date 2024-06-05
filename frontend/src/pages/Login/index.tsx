import React, { useEffect } from "react";
import { styled } from "@mui/system";
import { Box, Button, Container, Typography } from "@mui/material";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";

const RootContainer = styled(Box)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  background-image: radial-gradient(#c0c0c0 1px, transparent 1px),
    radial-gradient(#c0c0c0 1px, transparent 1px);
  background-size: 20px 20px;
`;

const LogoImage = styled("img")`
  width: 150px;
  margin-bottom: ${(props) => props.theme.spacing(4)};
`;

const LoginBox = styled(Container)`
  background-color: #fff;
  padding: ${(props) => props.theme.spacing(4)};
  border-radius: ${(props) => props.theme.spacing(1)};
  box-shadow: ${(props) =>
    //@ts-ignore
    props.theme.shadows[5]};
  text-align: center;
`;

const WelcomeBox = styled(Container)`
  background-color: transparent;
  padding: ${(props) => props.theme.spacing(4)};
  text-align: center;
`;

const ConnectButtonContainer = styled(Box)`
  margin-top: ${(props) => props.theme.spacing(2)};
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Login = () => {
  const router = useRouter();
  const Account = useAccount();
  // once address exists routes to dashboard
  useEffect(() => {
    if (Account.address) {
      localStorage.setItem("address", Account.address);
      router.push("/dashboard");
    }
  }, [Account.address, router]);

  return (
    <RootContainer>
      <WelcomeBox maxWidth="xs">
        <Typography sx={{ color: "#000" }} variant="h3" gutterBottom>
          Welcome to RPCGo
        </Typography>
      </WelcomeBox>
      <LoginBox maxWidth="xs">
        <Typography sx={{ color: "#000" }} variant="body1" gutterBottom>
          Please connect your wallet to sign-in or register.
        </Typography>
        <ConnectButtonContainer>
          <w3m-connect-button />
        </ConnectButtonContainer>
      </LoginBox>
    </RootContainer>
  );
};

export default Login;
