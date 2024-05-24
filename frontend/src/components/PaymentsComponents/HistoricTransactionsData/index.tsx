import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// component handles payments, deposits, withdrawals

interface HistoricDataProps {
  data: {
    deposits: {
      account: string;
      amount: string;
      transactionHash: string;
      id: string;
      blockTimestamp: string;
    }[];
    withdraws: {
      account: string;
      amount: string;
      transactionHash: string;
      id: string;
      blockTimestamp: string;
    }[];
  };
}

// function for converting string value from wei to ETH

const formatEther = (value: string): string => {
  const parsedValue = parseFloat(value);
  if (isNaN(parsedValue)) return '';
  return (parsedValue / 10**18).toFixed(6);
};

// function for formatting timestamp

const formatTimestamp = (timestamp: string): string => {
  const date = new Date(parseInt(timestamp) * 1000);
  return date.toLocaleString();
};

// component HistoricTransactionData

const HistoricTransactionData: React.FC<HistoricDataProps> = ({ data }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState<any[]>([]);


  // retrieves and sorts deposits and withdrawals based on the timestamp

  React.useEffect(() => {
    if (data){
    const transactions = [...data.deposits, ...data.withdraws];
    const sortedTransactions = transactions.sort((a, b) => {
        if (a.blockTimestamp === "Pending" || a.blockTimestamp === "Completed") {
          return -1;
        }
        if (b.blockTimestamp === "Pending" || b.blockTimestamp === "Completed") {
          return 1;
        }
        if (a.blockTimestamp === b.blockTimestamp) {
          return a.type === 'Deposit' ? -1 : 1;
        }
        return parseInt(b.blockTimestamp) - parseInt(a.blockTimestamp);
      });
    const formattedRows = sortedTransactions.map((transaction) => ({
      transactionHash: transaction.transactionHash,
      type: data.deposits.includes(transaction) ? 'Deposit' : 'Withdrawal',
      amount: formatEther(transaction.amount),
      date: transaction.blockTimestamp==="Pending" ? "Pending..." : transaction.blockTimestamp==="Completed" ? "Completed" : formatTimestamp(transaction.blockTimestamp),
    }));
    setRows(formattedRows);
    console.log(formattedRows);
    }
  }, [data]);

  // handles pagination

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Transaction Hash</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Amount (ETH)</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell>
                    <a 
                        href={`https://holesky.etherscan.io/tx/${row.transactionHash}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        title="View transaction in etherscan"
                        style={{display: 'inline-block', textDecoration: 'none', position: 'relative'}}
                    >
                        {row.transactionHash}
                        <span style={{position: 'absolute', marginLeft: '5px', top: '50%', transform: 'translateY(-50%)'}}>
                        <OpenInNewIcon size={12} style={{verticalAlign: 'middle'}} />
                        </span>
                    </a>
                    </TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell>{row.date}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default HistoricTransactionData;
