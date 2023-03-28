// import getConfig from 'next/config';
import Document, {
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html
        lang={this.props.locale || 'en'}
        data-theme="light"
        >
        <Head>
        <link rel="preconnect" href="https://api.fonts.coollabs.io" />
        <link
          href="https://api.fonts.coollabs.io/css2?family=M+PLUS+2:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
