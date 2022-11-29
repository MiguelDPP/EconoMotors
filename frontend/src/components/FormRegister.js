import React, { useEffect } from 'react';
import styles from '@styles/auth/Form.module.css';
import { Form, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import bg from '@images/bg4.png';
import Link from 'next/link';
import { useAuth } from '@hooks/useAuth';
import { useRouter } from 'next/router';
import { useAlert } from '@hooks/useAlert';
import { Formik } from 'formik';
import * as yup from 'yup';

const FormRegister = () => {

  const { alert, setAlert, toggleAlert } = useAlert();
  const { signin, error, setError } = useAuth();
  const router = useRouter();

  const schema = yup.object().shape({
    name: yup.string().required('Campo obrigatorio'),
    lastname: yup.string().required('Campo obrigatorio'),
    email: yup.string().required('Campo obrigatorio'),
    phone: yup.string().required('Campo obrigatorio'),
    sexo: yup.string().required('Campo obrigatorio'),
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
    const { name,lastname, email,phone,sexo, password } = values;

    register({name, lastname,email,phone,sexo,password})
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
              name: '',
              lastname: '',
              email: '',
              phone: '',
              sexo: '',
              password: ''
            }}
            >
              {({
                handleSubmit,
                handleChange,
                values,
                touched,
                errors,
              }) => (
                <Form className={`${styles.form} pr-3 pl-3`} onSubmit={handleSubmit}>
                  <h1 className={`${styles.formTitle}`}>Registrarme</h1>
                  <p className={`${styles.formText}`}>Ya tienes cuenta? <Link href="/" className={`${styles.link}`}>Inicia sesion</Link></p>
                  <Row>
                    <Col>
                      <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                        <Form.Label className={`${styles.formLabel}`}>Nombres <span>*</span></Form.Label>
                        <Form.Control type="text" placeholder="" id="name" name="name" className={`${styles.formControl}`} value={values.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name} />
                    <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                        <Form.Label className={`${styles.formLabel}`}>Apellidos <span>*</span></Form.Label>
                        <Form.Control type="text" placeholder="" id="lastname" name="lastname" className={`${styles.formControl}`} value={values.lastname}
                    onChange={handleChange}
                    isInvalid={!!errors.lastname} />
                    <Form.Control.Feedback type="invalid">
                    {errors.lastname}
                  </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                        <Form.Label className={`${styles.formLabel}`}>Correo electrónico <span>*</span></Form.Label>
                        <Form.Control type="email" placeholder="" id="email" name="email" className={`${styles.formControl}`} value={values.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email} />
                    <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                        <Form.Label className={`${styles.formLabel}`}>Telefono <span>*</span></Form.Label>
                        <Form.Control type="number" placeholder="" name="phone" id="phone" className={`${styles.formControl}`} value={values.phone}
                    onChange={handleChange}
                    isInvalid={!!errors.phone} />
                    <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                        <Form.Label className={`${styles.formLabel}`}>Genero <span>*</span></Form.Label>
                        <Form.Select className={`${styles.formControl}`} name="sexo" id="sexo" value={values.sexo}
                    onChange={handleChange}
                    isInvalid={!!errors.sexo} >
                          <option value="1">Femenino</option>
                          <option value="2">Masculino</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                    {errors.sexo}
                  </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                        <Form.Label className={`${styles.formLabel}`}>Contraseña <span>*</span></Form.Label>
                        <Form.Control type="password" placeholder="" name="password" className={`${styles.formControl}`} value={values.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password} />
                    <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className={`${styles.formGroup} mt-4 d-flex justify-content-between align-items-center`}>
                    <Form.Check type="checkbox" label="Acepto los terminos y politica de privacidad" className={`${styles.formCheck}`} />
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

export default FormRegister