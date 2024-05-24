import { gql, request } from 'graphql-request';

// fetches withrawals and depositons on rpc go smart contract from SubGraph

export async function fetchFromSubgraphWithdrawalsDeposits(wallet: string) { 
    const query = gql` 
    {
        deposits(where: {account: "${wallet}"}) {
          account
          amount
          transactionHash
          id
          blockTimestamp
        }
        withdraws(where: {account: "${wallet}"}) {
          account
          amount
          id
          transactionHash
          blockTimestamp
        }
      }
    `; 

    const result = await request<{ 
        deposits: [ 
            { 
                account: string,
                amount: string,
                transactionHash: string,
                id: string,
                blockTimestamp: string,
            } 
        ],
        withdraws: [ 
            { 
                account: string,
                amount: string,
                transactionHash: string,
                id: string,
                blockTimestamp: string,
            } 
        ]; 
    }>(process.env.NEXT_PUBLIC_GRAPH!, query); 
 
    return result; 
  }


  export async function fetchFromSubgrapPayments(wallet: string) { 
    const query = gql` 
    {
        payments(where: {account: "${wallet}"}) {
            amount
            account
            transactionHash
            blockTimestamp
        }
      }
    `; 

    const result = await request<{ 
        payments: [
            {
              amount: string,
              account: string,
              blockTimestamp: string,
              transactionHash: string
            }
        ]
    }>(process.env.NEXT_PUBLIC_GRAPH!, query); 
 
    return result; 
  }