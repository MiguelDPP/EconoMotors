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
        <ul className="navbar-nav bg-gradient-dark-personality sidebar sidebar-dark accordion" id="accordionSidebar">
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
          <li className="nav-item nav-dh active">
            <Link className="nav-link" href="/">
              <i className="fas fa-fw fa-tachometer-alt" />
              <span>Perfil</span></Link>
          </li>
          <li className="nav-item nav-dh ">
            <Link className="nav-link" href="/">
              <i className="fas fa-fw fa-tachometer-alt" />
              <span>Moto</span></Link>
          </li>
          <li className="nav-item nav-dh">
            <Link className="nav-link" href="/">
              <i className="fas fa-fw fa-tachometer-alt" />
              <span>Mantenimiento</span></Link>
          </li>
          <li className="nav-item nav-dh">
            <Link className="nav-link" href="/connect">
            <i className="fas fa-server"></i>
              <span>Broker</span></Link>
          </li>

        </ul>
        {/* End of Sidebar */}
        {/* Content Wrapper */}

        <div id="content-wrapper" className="d-flex flex-column">
          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item dropdown no-arrow">
                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="mr-2 d-none d-lg-inline text-gray-600 small">Douglas McGee</span>
                    
                </a>

                <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="userDropdown">
                    <a class="dropdown-item" href="#">
                     <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Profile
                    </a>
                    <a class="dropdown-item" href="#">
                      <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Settings
                    </a>
                    <a class="dropdown-item" href="#">
                      <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Activity Log
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                      <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Logout
                    </a>
                </div>
              </li>
            </ul>
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