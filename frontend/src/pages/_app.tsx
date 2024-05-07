import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Web3ModalProvider } from "../components/Web3ModalProvider";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return <ThemeProvider theme={theme}><Web3ModalProvider><Component {...pageProps} /></Web3ModalProvider></ThemeProvider>;
}