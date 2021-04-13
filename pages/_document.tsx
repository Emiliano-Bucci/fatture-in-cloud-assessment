import React from "react";
import Document, {
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import sprite from "svg-sprite-loader/runtime/sprite.build";

interface Props {
  spriteContent: string;
}

export default class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const spriteContent = sprite.stringify();

    return {
      spriteContent,
      ...initialProps,
    };
  }

  render() {
    return (
      <html lang="it">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            rel="preload"
            as="font"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;700&display=swap"
            type="font/woff2"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <div
            dangerouslySetInnerHTML={{
              __html: this.props.spriteContent,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
