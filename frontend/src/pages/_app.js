import '../styles/globals.css';
import '@styles/Dashboardstyles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// Importar jsQuery de bootstrap

import { useRouter } from 'next/router';
import DashboardLayout from '@layouts/DashboardLayout';

function Main ({children}) {
  return (
    <>
      {children}
    </>
  )
}

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const route = router.pathname.substring(1).split('/')[0];

  let Layout = Main;

  if (route == 'dashboard') {
    Layout = DashboardLayout;
  }


  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
