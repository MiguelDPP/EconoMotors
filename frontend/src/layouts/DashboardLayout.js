import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

const DashboardLayout = ({children}) => {
  return (
    <>
      <Head>
        <script src="https://kit.fontawesome.com/a2a9079cf6.js" crossorigin="anonymous"></script>
      </Head>
      <div id="wrapper">
        {/* Sidebar */}
        <ul className="navbar-nav bg-gradient-warning sidebar sidebar-dark accordion" id="accordionSidebar">
          {/* Sidebar - Brand */}
          <Link className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
            <div className="sidebar-brand-icon rotate-n-15">
            <i class="fas fa-motorcycle"></i>
            </div>
            <div className="sidebar-brand-text mx-3">EconoMotors</div>
          </Link>
          {/* Divider */}
          <hr className="sidebar-divider my-0" />
          {/* Nav Item - Dashboard */}
          <li className="nav-item active">
            <Link className="nav-link" href="/">
              <i className="fas fa-fw fa-tachometer-alt" />
              <span>Dispositivos</span></Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" href="/connect">
            <i className="fas fa-server"></i>
              <span>Broker</span></Link>
          </li>

        </ul>
        {/* End of Sidebar */}
        {/* Content Wrapper */}

        <div id="content-wrapper" className="d-flex flex-column">
          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            {/* <span className={`badge bg-${(connected)?"success":"danger"} text-lg`}>{(connected)?`Conectado a ${broker}`:"Desconectado"}</span> */}
          </nav>
          <div className='row'>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardLayout;