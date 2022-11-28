import React from 'react';
import styles from '@styles/auth/Form.module.css';
import { Form, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import bg from '@images/bg3.png';
import Link from 'next/link';

const FormLogin = () => {
  return (
    <div className={`${styles.containerMain}`}>
      <div className={`${styles.container}`}>
        <Row className={`${styles.Row}`}>
          <Col className={`${styles.contentImage} p-0`}>
            <img src={bg.src} alt="logo" className={`${styles.imageForm}`}/>
          </Col>
          <Col className={`${styles.contentForm} p-0`}>
            <Form className={`${styles.form}`}>
              <h1 className={`${styles.formTitle}`}>Iniciar Sesión</h1>
              <p className={`${styles.formText}`}>No tienes cuenta? <Link href="/register" className={`${styles.link}`}>Registrarme</Link></p>
              <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                <Form.Label className={`${styles.formLabel}`}>Correo Electrónico <span>*</span></Form.Label>
                <Form.Control type="email" placeholder="Ingresa tu correo electrónico" className={`${styles.formControl}`} />
              </Form.Group>
              <Form.Group className={`${styles.formGroup} mt-4`}>
                <Form.Label className={`${styles.formLabel}`}>Digite su contraseña <span>*</span></Form.Label>
                <Form.Control type="password" placeholder="******" className={`${styles.formControl}`} />
              </Form.Group>
              <Form.Group className={`${styles.formGroup} mt-4 d-flex justify-content-between align-items-center`}>
                <Form.Check type="checkbox" label="Recuerdame" className={`${styles.formCheck}`} />
                <Link href="/forgot-password" className={`${styles.link}`}>Olvide mi contraseña</Link>
              </Form.Group>
              <button className={`${styles.formButton} btn mt-2`}>Iniciar Sesión</button>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default FormLogin