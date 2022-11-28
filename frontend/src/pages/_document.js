import Document, {Html, Head, Main, NextScript} from "next/document";

class MyDocument extends Document {
    render() {
      return (
        <Html lang="es">
          <Head>
            <title>EconoMotors</title>
            {/* importar CDN de Jquery */}
            
            <meta charSet="utf-8" />
          </Head>
          <body>
            <Main />
            <NextScript>
              <script src="../assets/js/jquery.js"></script>
              <script src="../assets/js/bootstrap.b.js"></script>

              <script src="../assets/js/jq.easing.js"></script>
              <script src="../assets/js/sb-admin.js"/>

              <script src="../assets/js/dataTables.js"></script>
              <script src="../assets/js/dataTables.b.js"></script>
              <script src="../assets/js/dataTables.demo.js"></script>
            </NextScript>
            
          </body>
        </Html>
      );
    }
}
export default MyDocument;