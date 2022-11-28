import React from 'react';
import styles from '@styles/auth/Form.module.css';
import { Form, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import bg from '@images/bg2.png';
import Link from 'next/link';

const FormRegister = () => {
  return (
    <div className={`${styles.containerMain}`}>
      <div className={`${styles.container}`}>
        <Row className={`${styles.Row}`}>
          <Col className={`${styles.contentImage} p-0`}>
            <img src={bg.src} alt="logo" className={`${styles.imageForm}`}/>
          </Col>
          <Col className={`${styles.contentForm} p-0`}>
            <Form className={`${styles.form} pr-3 pl-3`}>
              <h1 className={`${styles.formTitle}`}>Registrarme</h1>
              <p className={`${styles.formText}`}>Ya tienes cuenta? <Link href="/" className={`${styles.link}`}>Inicia sesion</Link></p>
              <Row>
                <Col>
                  <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                    <Form.Label className={`${styles.formLabel}`}>Nombres <span>*</span></Form.Label>
                    <Form.Control type="text" placeholder="" className={`${styles.formControl}`} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                    <Form.Label className={`${styles.formLabel}`}>Apellidos <span>*</span></Form.Label>
                    <Form.Control type="text" placeholder="" className={`${styles.formControl}`} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                    <Form.Label className={`${styles.formLabel}`}>Correo electrónico <span>*</span></Form.Label>
                    <Form.Control type="email" placeholder="" className={`${styles.formControl}`} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                    <Form.Label className={`${styles.formLabel}`}>Telefono <span>*</span></Form.Label>
                    <Form.Control type="text" placeholder="" className={`${styles.formControl}`} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                    <Form.Label className={`${styles.formLabel}`}>Genero <span>*</span></Form.Label>
                    <Form.Select className={`${styles.formControl}`} name="gender">
                      <option value="1">Femenino</option>
                      <option value="2">Masculino</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                    <Form.Label className={`${styles.formLabel}`}>contraseña <span>*</span></Form.Label>
                    <Form.Control type="password" placeholder="" className={`${styles.formControl}`} />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className={`${styles.formGroup} mt-4 d-flex justify-content-between align-items-center`}>
                <Form.Check type="checkbox" label="Acepto los terminos y politica de privacidad" className={`${styles.formCheck}`} />
              </Form.Group>
              <button className={`${styles.formButton} btn mt-5`}>Iniciar Sesión</button>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default FormRegister