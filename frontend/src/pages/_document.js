import Document, {Html, Head, Main, NextScript} from "next/document";
import sbAdmin from '@js/sb-admin.js';

class MyDocument extends Document {
    render() {
      return (
        <Html lang="es">
          <Head>
            <title>EconoMotors</title>
            <meta charSet="utf-8" />
          </Head>
          <body>
            <Main />
            <NextScript />
            <script src={sbAdmin} />
          </body>
        </Html>
      );
    }
}
export default MyDocument;