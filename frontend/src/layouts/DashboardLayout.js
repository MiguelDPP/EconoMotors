import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from '@styles/Dashboard.module.css';
import { Dropdown, DropdownButton, Image, ProgressBar } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '@hooks/useAuth';
import Cookie from 'js-cookie';
import { useAlert } from '@hooks/useAlert';

const DashboardLayout = ({ children }) => {

  const router = useRouter();
  const {user, getUser, setUser} = useAuth();
  const [isReady, setIsReady] = useState(false);
  const { alert, setAlert, toggleAlert } = useAlert();

  useEffect(() => {
    if (Cookie.get('access_token') == null) {
      setAlert({
        active: true,
        message: 'Credenciales han expirado',
        type: 'danger',
      });
      router.push("/");
    } else {
      if (user === null) {
        getUser()
          .then((response) => {
            setIsReady(true);
          })
          .catch((error) => {
            Cookie.remove("access_token");
            setUser(null);
            setAlert({
              active: true,
              message: 'Credenciales han expirado',
              type: 'danger',
            });
            router.push("/");
          });
      } else {
        setIsReady(true);
      }
      // getUser()
      // .then((response) => {
      //   setIsReady(true);
      // })
      // .catch((error) => {
      //   Cookie.remove("access_token");
      //   setUser(null);
      //   router.push("/");
      //   setAlert({
      //     active: true,
      //     message: 'Credenciales han expirado',
      //     type: 'danger',
      //   });
      // });
    }
  }, [
    user
  ]);

  const handleLogout = (e) => {
    e.preventDefault();
    Cookie.remove("access_token");
    router.push("/");
  } 

  return (
    <>
      {isReady && (
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
                  <i className="fas fa-motorcycle"></i>
                </div>
                <div className="sidebar-brand-text mx-3">EconoMotors</div>
              </Link>
              {/* Divider */}
              <hr className="sidebar-divider my-0" />
              {/* Nav Item - Dashboard */}
              <li className="nav-item nav-dh">
                <Link className="nav-link" href="/dashboard">
                  <i className="fas fa-fw fa-tachometer-alt" />
                  <span>Perfil</span></Link>
              </li>
              <li className="nav-item nav-dh ">
                <Link className="nav-link" href="/dashboard/moto">
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
              <nav className={`navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow ${styles.nav}`}>

                <div className={`${styles.info}`}>
                  <div className={`${styles.infoItem}`} >
                    <i className="fas fa-gas-pump"></i>
                    <ProgressBar now={60} />
                  </div>
                  <div className={`${styles.infoItem}`} >
                    <i className="fas fa-oil-can"></i>
                    <ProgressBar now={30} variant="danger" />
                  </div>

                </div>

                <div className={styles.drops}>
                  <Dropdown className={`${styles.menu}`} >
                    <Dropdown.Toggle className={``}>
                      <i className="fas fa-envelope mr-2"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu variant="dark" className='mt-2' style={{ maxWidth: 300 }} >
                      <Dropdown.Item href="#/action-1" active>
                        Action
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} href="/dashboard/profile">Es hora de cambiar el aceite de tu moto</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>


                  <Dropdown className={`${styles.menu}`} >
                    <Dropdown.Toggle as="span" className={styles.toggle}>
                      <span className="mr-2">{user && user.name}</span>
                      <Image src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${user && user.name}`} className='rounded-circle' />
                    </Dropdown.Toggle>

                    <Dropdown.Menu variant="dark" className='mt-2' >
                      <Dropdown.Item href="#/action-1">
                        <i className="fas fa-user-circle"></i> <span className="ml-2">Perfil</span>
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} href="/dashboard/profile">
                        <i className="fas fa-clipboard-list"></i> <span className="ml-2">Horarios</span>
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        <i className="fas fa-store"></i> <span className="ml-2">Tienda</span>
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item href="/" onClick={handleLogout}>
                        <i class="fas fa-door-open"></i> <span className="ml-2">Cerrar Sesión</span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <i class="fas fa-comments-alt"></i>

                </div>



              </nav>
              <div className='row'>
                {children}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default DashboardLayout;