import React, { useEffect, useState } from 'react';
import styles from '@styles/Perfil.module.css';
import { Form, Row, Col, Image,Alert } from 'react-bootstrap';
import { useAuth } from '@hooks/useAuth';
import Cookie from 'js-cookie';
import { useAlert } from '@hooks/useAlert';
import { Formik, Field } from 'formik';
import * as yup from 'yup';

const perfil = () => {

    const {user, getUser, setUser, error, setError, updateUser} = useAuth();
    const [isUpdate, setIsUpdate] = useState(false);
    const { alert, setAlert, toggleAlert } = useAlert();


    const schema = yup.object().shape({
        name: yup.string().required('Campo obrigatorio'),
        last_name: yup.string().required('Campo obrigatorio'),
        email: yup.string().required('Campo obrigatorio'),
        phone: yup.string().required('Campo obrigatorio'),
        gender: yup.number().min(1).required("Genero es requerido"),
        password: yup.string().required('Campo obrigatorio')
    });

    const handleSubmit = (values) => {
        const data = { 
          name: values.name,
          last_name: values.last_name,
          email: values.email,
          phone: values.phone,
          gender: values.gender,
          password: values.password
        }
          
        updateUser(data)
          .then((response) => {
            setAlert({
              ...alert,
              type: 'success',
              active: true,
              message: 'Usuario actualizado correctamente',
            });
            setIsUpdate(true);
          })
          .catch((error) => {
            setAlert({
              active: true,
              message: "Credenciales incorrectas",
              type: "danger",
            });
            console.log("No se pudo...");
          });
      }

      useEffect(()=>{
        getUser().then(()=>{});
      },[isUpdate]);

  return (
    <div>
        <Formik validationSchema={schema} onSubmit={handleSubmit} initialValues={{
            name: user.name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone,
            gender: user.gender,
            password: ''
        }}>
        {({handleSubmit, errors, touched}) => (
            <Form className={`${styles.form}`} onSubmit={handleSubmit}>
                <h3 className={`${styles.formTitle}`}><i className="fas fa-user mr-2 mt-4"></i>Perfil</h3>
                <Row>
                    <Col>
                        <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                            <Form.Label className={`${styles.formLabel}`}>Nombre <span>*</span></Form.Label>
                            <Field as={Form.Control}  type="text" name="name" id="name"  placeholder="" className={`${styles.formControl}`}
                        isInvalid={!!errors.name && touched.name} />
                            <Form.Control.Feedback type="invalid">
                            {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                            <Form.Label className={`${styles.formLabel}`}>Apellido <span>*</span></Form.Label>
                            <Field as={Form.Control} type="text" name="last_name" id="last_name" className={`${styles.formControl}`}
                        isInvalid={!!errors.last_name && touched.last_name}/>
                            <Form.Control.Feedback type="invalid">
                            {errors.last_name}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                            <Form.Label className={`${styles.formLabel}`}>Correo <span>*</span></Form.Label>
                            <Field as={Form.Control} type="email" name="email" id="email"  placeholder=""  className={`${styles.formControl}`}
                        isInvalid={!!errors.email && touched.email}/>
                            <Form.Control.Feedback type="invalid">
                            {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                            <Form.Label className={`${styles.formLabel}`}>Telefono <span>*</span></Form.Label>
                            <Field as={Form.Control}  type="number" name="phone" id="phone"  placeholder=""  className={`${styles.formControl}`}
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
                            <Field as={Form.Select} className={`${styles.formControl}`}  name="gender" id="gender" isInvalid={!!errors.gender && touched.gender} >
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
                            <Form.Label className={`${styles.formLabel}`}>Contraseña <span><b><small>(Escribe la contraseña)</small></b></span></Form.Label>
                            <Field as={Form.Control}  type="password" name="password"  id="password"  placeholder="" className={`${styles.formControl}`}
                            isInvalid={!!errors.password && touched.password}/>
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                { alert.active && <Alert variant={alert.type}>{alert.message}</Alert> }

                <button className={`${styles.formButton} btn mt-4`}><i class="fas fa-save mr-2"></i>Actualizar</button>
            </Form>
         )}
        </Formik>
    </div>
  )
}

export default perfil