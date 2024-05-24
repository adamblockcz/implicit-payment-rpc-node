import { useEffect } from "react";
import { watchAccount } from "@wagmi/core";
import { config } from "../Web3ModalProvider";
import { useRouter } from "next/router";

// on every page this component verifies user has their wallet connected

export function LoggedInVerifier() {
    const router = useRouter();
    useEffect(() => {
      const disconnect = watchAccount(config, {
        onChange(data) {
          if (data.isDisconnected){
            router.push('/login');
          }
        },
      })
      return disconnect;
    }, [router]);
  
    return null;
  }
