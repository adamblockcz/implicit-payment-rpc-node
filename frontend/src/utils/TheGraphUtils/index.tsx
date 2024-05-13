import { gql, request } from 'graphql-request';

export async function fetchFromSubgraphWithdrawalsDeposits(wallet: string) { 
    const query = gql` 
    {
        deposits(where: {account: "0xeBA9F5787B2250a231f6823f4Bb5fE17B6e6Af47"}) {
          account
          amount
          transactionHash
          id
          blockTimestamp
        }
        withdraws(where: {account: "0xeBA9F5787B2250a231f6823f4Bb5fE17B6e6Af47"}) {
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