import { Html, Head, Main, NextScript, DocumentProps } from "next/document";
import type { DocumentHeadTagsProps } from '@mui/material-nextjs/v13-pagesRouter';
import {
    DocumentHeadTags,
    documentGetInitialProps,
  } from '@mui/material-nextjs/v13-pagesRouter';
export default function Document(props: DocumentProps & DocumentHeadTagsProps) {
  return (
    <Html lang="en">
      <Head>
      <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx: any) => {
    const finalProps = await documentGetInitialProps(ctx);
    return finalProps;
  };