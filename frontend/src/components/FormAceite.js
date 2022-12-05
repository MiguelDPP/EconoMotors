import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Alert, Button, FloatingLabel } from 'react-bootstrap';
import styles from '@styles/auth/Form.module.css';
import { useRouter } from 'next/router';
import { useAlert } from '@hooks/useAlert';
import { Formik, Field } from 'formik';
import Table from 'react-bootstrap/Table';
import Tools from '@services/api/Tools';
import parse from 'html-react-parser';
import * as yup from 'yup';

const FormAceite = () =>{

    const { alert, setAlert, toggleAlert } = useAlert();
    const { storeOil, getOils } = Tools();
    const [isValid, setIsValid] = useState(false);

    
    useEffect(() => {
        if (alert.active && alert.autoClose) {
          setTimeout(() => {
            toggleAlert();
          }, 3000);
        }
    }, [alert]);


    const handleSubmit = (values, { resetForm }) => {
        const data = { 
            date: values.date,
            description: values.description,
            price: values.price
        }

        storeOil(data)
        .then((response) =>{
            setAlert({
                active: true,
                message: 'Has depositado Aceite correctamente a tu moto.',
                type: 'success',
              });
              resetForm();
              setIsValid(true);
    
        }).catch((error) =>{
            setAlert({
                active: false,
                message: 'Error al registrar el deposito de Aceite.',
                type: 'danger',
              });
        });
    }

    return (
        <div>
            <h5><i class="fas fa-oil-can mr-2"></i>Aceite</h5>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail.date">
                                <Form.Label className={`${styles.formLabel}`}>Fecha de Registro <span>*</span></Form.Label>
                                <Form.Control  type="date" name="date"   placeholder="" className={`${styles.formControl}`}/>
                        </Form.Group>

                        <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail.desc">
                                <Form.Label className={`${styles.formLabel}`}>Descripción <span>*</span></Form.Label>
                                <Form.Control  type="text" name="station" className={`${styles.formControl}`}  />
                        </Form.Group>

                        <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail.price">
                                <Form.Label className={`${styles.formLabel}`}>Precio <span>*</span></Form.Label>
                                <Form.Control  type="text" name="price" placeholder="" className={`${styles.formControl}`}  />
                        </Form.Group>

                        { alert && <Alert variant={alert.type}>{parse(alert.message)}</Alert> }
                        
                        <Button type="submit" variant="warning" className={`mt-3`}>
                            <i class="fas fa-save mr-2"></i>Registrar
                        </Button>
                    </Form> 
                </Col>
                <Col>
                
                </Col>
            </Row>
        </div>
    )
}

export default FormAceite;