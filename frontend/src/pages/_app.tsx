import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Web3ModalProvider } from "../components/Web3ModalProvider";
import { AppCacheProvider } from '@mui/material-nextjs/v13-pagesRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
  });

const theme = createTheme({
  typography: {
        fontFamily: roboto.style.fontFamily,
  },
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

export default function App( props: AppProps) {

  return <AppCacheProvider {...props}><ThemeProvider theme={theme}><Web3ModalProvider><props.Component {...props.pageProps} /></Web3ModalProvider></ThemeProvider></AppCacheProvider>;
}