import { useEffect } from "react";
import { watchAccount } from "@wagmi/core";
import { config } from "../Web3ModalProvider";
import { useRouter } from "next/router";

export function LoggedInVerifier() {
    const router = useRouter();
    useEffect(() => {
      const disconnect = watchAccount(config, {
        onChange(data) {
          console.log(data);
          if (data.isDisconnected){
            router.push('/login');
          }
        },
      })
      return disconnect;
    });
  
    return null;
  }
