import '../styles/globals.css';
import '@styles/Dashboardstyles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// Importar jsQuery de bootstrap

import { useRouter } from 'next/router';
import DashboardLayout from '@layouts/DashboardLayout';
import AuthLayout from '@layouts/AuthLayout';
import { ProviderAuth } from "hooks/useAuth";
import { ProviderAlert } from "hooks/useAlert";

// function Main ({children}) {
//   return (
//     <>
//       {children}
//     </>
//   )
// }

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const route = router.pathname.substring(1).split('/')[0];

  let Layout = AuthLayout;

  if (route == 'dashboard') {
    Layout = DashboardLayout;
  }


  return (
    <ProviderAuth>
      <ProviderAlert>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ProviderAlert>
    </ProviderAuth>
  )
}
