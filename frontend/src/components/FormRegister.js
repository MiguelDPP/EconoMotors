import React, { useEffect } from 'react';
import styles from '@styles/auth/Form.module.css';
import { Form, Row, Col, Alert } from 'react-bootstrap';
import Image from 'next/image';
import bg from '@images/bg4.png';
import Link from 'next/link';
import { useAuth } from '@hooks/useAuth';
import { useRouter } from 'next/router';
import { useAlert } from '@hooks/useAlert';
import { Formik, Field } from 'formik';
import * as yup from 'yup';

const FormRegister = () => {

  const { alert, setAlert, toggleAlert } = useAlert();
  const { register } = useAuth();
  const router = useRouter();

  const schema = yup.object().shape({
    name: yup.string().required('Campo obrigatorio'),
    last_name: yup.string().required('Campo obrigatorio'),
    email: yup.string().required('Campo obrigatorio'),
    phone: yup.string().required('Campo obrigatorio'),
    gender: yup.number().min(1).required("Genero es requerido"),
    password: yup.string().required('Campo obrigatorio'),
    terms: yup.boolean().oneOf([true], 'Terminos deben ser aceptados')
  });


  useEffect(() => {
    if (alert.active && alert.autoClose) {
      setTimeout(() => {
        toggleAlert();
      }, 3000);
    }
  }, [alert]);

  const handleSubmit = (values) => {
    const data = { 
      name: values.name,
      last_name: values.last_name,
      email: values.email,
      phone: values.phone,
      gender: values.gender,
      password: values.password,
      password_confirmation: values.password
    }
      
    register(data)
      .then((response) => {
        setAlert({
          ...alert,
          type: 'success',
          active: true,
          message: 'Usuario registrado correctamente',
        });
        router.push("/");
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
              last_name: '',
              email: '',
              phone: '',
              gender: 1,
              password: '',
              terms: false,
            }}
            >
              {({
                handleSubmit,
                // handleChange,
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
                        <Field as={Form.Control} type="text" placeholder="" name="name" className={`${styles.formControl}`}
                            isInvalid={!!errors.name && touched.name} />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                        <Form.Label className={`${styles.formLabel}`}>Apellidos <span>*</span></Form.Label>
                        <Field as={Form.Control} type="text" placeholder="" name="last_name" className={`${styles.formControl}`}
                    isInvalid={!!errors.last_name && touched.last_name} />
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
                        <Field as={Form.Control} type="email" placeholder="" name="email" className={`${styles.formControl}`}
                    isInvalid={!!errors.email && touched.email} />
                    <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                        <Form.Label className={`${styles.formLabel}`}>Telefono <span>*</span></Form.Label>
                        <Field as={Form.Control} type="number" placeholder="" name="phone" className={`${styles.formControl}`}
                    isInvalid={!!errors.phone && touched.phone} />
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
                        <Field as={Form.Select} className={`${styles.formControl}`} name="gender"
                          isInvalid={!!errors.gender && touched.gender} >
                          <option value="1">Femenino</option>
                          <option value="2">Masculino</option>
                        </Field>
                        <Form.Control.Feedback type="invalid">
                    {errors.gender}
                  </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                        <Form.Label className={`${styles.formLabel}`}>Contraseña <span>*</span></Form.Label>
                        <Field as={Form.Control} type="password" placeholder="" name="password" className={`${styles.formControl}`} value={values.password}
                    isInvalid={!!errors.password && touched.password} />
                    <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className={`${styles.formGroup} mt-4 d-flex justify-content-between align-items-center`}>
                    <Field as={Form.Check} name="terms" type="checkbox" label="Acepto los terminos y politica de privacidad" className={`${styles.formCheck}`} 
                      isInvalid={!!errors.terms && touched.terms}
                    />
                  </Form.Group>

                  { alert && <Alert variant={alert.type}>{alert.message}</Alert> }
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