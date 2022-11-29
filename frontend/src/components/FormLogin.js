import React, { useEffect } from 'react';
import styles from '@styles/auth/Form.module.css';
import { Form, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import bg from '@images/bg3.png';
import Link from 'next/link';
import { useAuth } from '@hooks/useAuth';
import { useRouter } from 'next/router';
import { useAlert } from '@hooks/useAlert';
import { Formik } from 'formik';
import * as yup from 'yup';

const FormLogin = () => {

  const { alert, setAlert, toggleAlert } = useAlert();
  const { signin, error, setError } = useAuth();
  const router = useRouter();

  const schema = yup.object().shape({
    email: yup.string().required('Campo obrigatorio'),
    password: yup.string().required('Campo obrigatorio')
  });

  useEffect(() => {
    if (alert.active && alert.autoClose) {
      setTimeout(() => {
        toggleAlert();
      }, 3000);
    }
  }, [alert]);

  const handleSubmit = (values) => {
    const { email, password } = values;

    signin(email, password)
      .then((response) => {
        setAlert({
          ...alert,
          active: false,
          message: '',
        });
        router.push("/dashboard");
      })
      .catch((error) => {
        setAlert({
          active: true,
          message: "Credenciales incorrectas",
          type: "danger",
        });
      });
  }


  return (
    <div className={`${styles.containerMain}`}>
      <div className={`${styles.container}`}>
        <Row className={`${styles.Row}`}>
          <Col className={`${styles.contentImage} p-0`}>
            <img src={bg.src} alt="logo" className={`${styles.imageForm}`}/>
          </Col>
          <Col className={`${styles.contentForm} p-0`}>
            <Formik validationSchema={schema} onSubmit={handleSubmit} 
            initialValues={{
                email: '',
                password: ''
              }}>
                {({
                   handleSubmit,
                   handleChange,
                   values,
                   touched,
                   errors,
                }) => (
              <Form className={`${styles.form}`} onSubmit={handleSubmit}>
                <h1 className={`${styles.formTitle}`}>Inicio de Sesión</h1>
                <p className={`${styles.formText}`}>No tienes cuenta? <Link href="/register" className={`${styles.link}`}>Registrarme</Link></p>
                <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                  <Form.Label className={`${styles.formLabel}`}>Correo Electrónico <span>*</span></Form.Label>
                  <Form.Control type="email" name="email" id="email"  placeholder="Ingresa tu correo electrónico" className={`${styles.formControl}`}
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className={`${styles.formGroup} mt-4`}>
                  <Form.Label className={`${styles.formLabel}`}>Digite su contraseña <span>*</span></Form.Label>
                  <Form.Control type="password" name="password" id="password" className={`${styles.formControl}`}
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className={`${styles.formGroup} mt-4 d-flex justify-content-between align-items-center`}>
                  <Form.Check type="checkbox" label="Recuerdame" className={`${styles.formCheck}`} />
                  <Link href="/forgot-password" className={`${styles.link}`}>Olvide mi contraseña</Link>
                </Form.Group>
                <button className={`${styles.formButton} btn mt-2`}>Iniciar Sesión</button>
              </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default FormLogin