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
              <script src={'bootstrap/dist/js/bootstrap.bundle.min.js'} />
              <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossOrigin="anonymous"></script>
              <script src="../assets/js/sb-admin.js"/>
            </NextScript>
            
          </body>
        </Html>
      );
    }
}
export default MyDocument;