import React from 'react';
import { LineChart } from '@mui/x-charts';
import { Box } from '@mui/material';

// component for showing trasnaction data

interface TransactionProps {
    data: {
        payments: [{
            account: string;
            amount: string;
            transactionHash: string;
            blockTimestamp: string;
        }];
    };
  }

// component with graph of usage

export default function UsageGraph({ data }: TransactionProps) {

  const today = new Date();
  const endDate = today.getTime() / 1000;
  if(data){
    // initialize dates
    const last60DaysStart = new Date();
    last60DaysStart.setDate(today.getDate() - 60);
    const startDate60Days = last60DaysStart.getTime() / 1000;
    const previous30DaysStart = new Date();
    previous30DaysStart.setDate(today.getDate() - 90);
    const startDate30Days = previous30DaysStart.getTime() / 1000;
    // sort transaction into two intervals
    const transactionsLast30Days = data.payments.filter(
        transaction => Number(transaction.blockTimestamp) >= startDate30Days && Number(transaction.blockTimestamp) <= endDate
    );

    const transactionsPrevious30Days = data.payments.filter(
        transaction => Number(transaction.blockTimestamp) <= startDate30Days && Number(transaction.blockTimestamp) >= startDate60Days
    );
    // sort create array od data - usage per day
    const countTransactionsPerDay = (transactions: TransactionProps) => {
    const counts = {};
    transactions.forEach(transaction => {
        const date = new Date(transaction.blockTimestamp * 1000);
        const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        counts[dateString] = (counts[dateString] || 0) + 1;
    });
    return counts;
    };

    const countsLast30Days = countTransactionsPerDay(transactionsLast30Days);
    const countsPrevious30Days = countTransactionsPerDay(transactionsPrevious30Days);

    // Create an array of dates for the last 30 days
    const last30DaysDates = [];
    for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        last30DaysDates.push(dateString);
    }

    // Fill in 0s for days with no transactions in the last 30 days
    const last30DaysData = last30DaysDates.map(date => ({ x: date, y: countsLast30Days[date] || 0 }));

    // Repeat the same process for the previous 30 days
    const previous30DaysDates = [];
    for (let i = 59; i >= 30; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        previous30DaysDates.push(dateString);
    }
    const previous30DaysData = previous30DaysDates.map(date => ({ x: date, y: countsPrevious30Days[date] || 0 }));

    const last30DaysDataEntries = last30DaysData.map(item => item.y)
    const previous30DaysDataEntries = previous30DaysData.map(item => item.y);

    const days: number[] = [];
    for (let i = 1; i <= 30; i++) {
      days.push(i);
    }

    return (
        <LineChart
        xAxis={[
            {
              id: 'Days',
              data: days,
            },
          ]}
          width={"900"}
          height={400}
          margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
          series={[
            { curve: "linear", label: "Last 30 days usage", data: last30DaysDataEntries },
            { curve: "linear", label: "Previous 30 days usage", data: previous30DaysDataEntries },
            
      ]}
        >
        </LineChart>
      );
  }
  

  return (
    <Box></Box>
  );
};
