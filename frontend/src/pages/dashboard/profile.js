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
        getUser().then(()=>{
            
        });
      },[isUpdate]);

  return (
    <div>
        <Formik validationSchema={schema} onSubmit={handleSubmit}>
        {(props) => (
            <Form className={`${styles.form}`} onSubmit={props.handleSubmit}>
                <h3 className={`${styles.formTitle}`}><i className="fas fa-user mr-2 mt-4"></i>Perfil</h3>
                <Row>
                    <Col>
                        <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                            <Form.Label className={`${styles.formLabel}`}>Nombre <span>*</span></Form.Label>
                            <Form.Control type="text" name="name" id="name"  placeholder="" value={user.name} className={`${styles.formControl}`}
                        isInvalid={!!props.errors.name && props.touched.name} />
                            <Form.Control.Feedback type="invalid">
                            {props.errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                            <Form.Label className={`${styles.formLabel}`}>Apellido <span>*</span></Form.Label>
                            <Form.Control type="text" name="last_name" id="last_name"  value={user.last_name} className={`${styles.formControl}`}
                        isInvalid={!!props.errors.last_name && props.touched.last_name}/>
                            <Form.Control.Feedback type="invalid">
                            {props.errors.last_name}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                            <Form.Label className={`${styles.formLabel}`}>Correo <span>*</span></Form.Label>
                            <Form.Control type="email" name="email" id="email"  placeholder="" value={user.email} className={`${styles.formControl}`}
                        isInvalid={!!props.errors.email && props.touched.email}/>
                            <Form.Control.Feedback type="invalid">
                            {props.errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                            <Form.Label className={`${styles.formLabel}`}>Telefono <span>*</span></Form.Label>
                            <Form.Control type="number" name="phone" id="phone"  placeholder="" value={user.phone} className={`${styles.formControl}`}
                            isInvalid={!!props.errors.phone && props.touched.phone} />
                            <Form.Control.Feedback type="invalid">
                            {props.errors.phone}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                
                <Row>
                    <Col>
                        <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                            <Form.Label className={`${styles.formLabel}`}>Genero <span>*</span></Form.Label>
                            <Form.Select className={`${styles.formControl}`} value={user.gender} name="gender" id="gender" isInvalid={!!props.errors.gender && props.touched.gender} >
                                <option value="1">Femenino</option>
                                <option value="2">Masculino</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {props.errors.gender}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                            <Form.Label className={`${styles.formLabel}`}>Contraseña <span><b><small>(Escribe la contraseña)</small></b></span></Form.Label>
                            <Form.Control type="password" name="password" value={user.password} id="password"  placeholder="" className={`${styles.formControl}`}
                            isInvalid={!!props.errors.password && props.touched.password}/>
                            <Form.Control.Feedback type="invalid">
                                {props.errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                { alert && <Alert variant={alert.type}>{alert.message}</Alert> }

                <button className={`${styles.formButton} btn mt-4`}><i class="fas fa-save mr-2"></i>Actualizar</button>
            </Form>
         )}
        </Formik>
    </div>
  )
}

export default perfil