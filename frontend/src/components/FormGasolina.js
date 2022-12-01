import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Alert, Button } from 'react-bootstrap';
import styles from '@styles/auth/Form.module.css';
import { useRouter } from 'next/router';
import { useAlert } from '@hooks/useAlert';
import { Formik, Field } from 'formik';
import Table from 'react-bootstrap/Table';
import Tools from '@services/api/Tools';
import DataTable from 'react-data-table-component';
import TableGasolines from './TableGasolines';
import * as yup from 'yup';



const FormGasolina = () =>{


    const { alert, setAlert, toggleAlert } = useAlert();
    const { storeGasoline, getGasolines } = Tools();
    const [isValid, setIsValid] = useState(false);
    const [itemsGasolines, setItemsGasolines] = useState({});
    

    const schema = yup.object().shape({
        date: yup.string().required('Campo obrigatorio'),
        station: yup.string().required('Campo obrigatorio'),
        price: yup.string().required('Campo obrigatorio')
    });

    useEffect(() => {
        if (alert.active && alert.autoClose) {
          setTimeout(() => {
            toggleAlert();
          }, 3000);
        }
    }, [alert]);

    useEffect(() =>{

        getGasolines().then((response)=>{
            setItemsGasolines(response);
            console.log(response.gasolines);
        });

    }, [isValid]);

    useEffect(() =>{

        getGasolines().then((response)=>{
            setItemsGasolines(response);
        });

    }, []);


    const handleSubmit = (values, { resetForm }) => {
        const data = { 
            date: values.date,
            station: values.station,
            price: values.price
        }

        storeGasoline(data)
        .then((response) =>{
            setAlert({
                active: true,
                message: 'Has depositado gasolina correctamente.',
                type: 'success',
              });
              resetForm();
              setIsValid(true);
    
        }).catch((error) =>{
            setAlert({
                active: false,
                message: 'Error al registrar el deposito de la gasolina.',
                type: 'danger',
              });
        });
    }

    return (
        <div>

            <h5><i class="fas fa-tint mr-2"></i>Gasolina</h5>
            <Row>
                <Col>
                    <Formik validationSchema={schema} onSubmit={handleSubmit} initialValues={{ date: '', station: '', price: ''}}>
                        {({
                            handleSubmit,
                            touched,
                            values,
                            resetForm,
                            errors,
                        })=>(
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                                        <Form.Label className={`${styles.formLabel}`}>Fecha de Registro <span>*</span></Form.Label>
                                        <Field as={Form.Control}  type="date" name="date" id="date"  placeholder="" className={`${styles.formControl}`} isInvalid={!!errors.date && touched.date} />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.date}
                                        </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                                        <Form.Label className={`${styles.formLabel}`}>Bomba <span>*</span></Form.Label>
                                        <Field as={Form.Control}  type="text" name="station" id="station"  placeholder="" className={`${styles.formControl}`} isInvalid={!!errors.station && touched.station} />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.station}
                                        </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                                        <Form.Label className={`${styles.formLabel}`}>Precio <span>*</span></Form.Label>
                                        <Field as={Form.Control} type="text" name="price" id="price"  placeholder="" className={`${styles.formControl}`} isInvalid={!!errors.price && touched.price} />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.price}
                                        </Form.Control.Feedback>
                                </Form.Group>

                                { alert && <Alert variant={alert.type}>{alert.message}</Alert> }

                                <Button type="submit" variant="warning" className={`mt-3`}>
                                <i class="fas fa-save mr-2"></i>Registrar
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Col>
                <Col>
                    <TableGasolines>{itemsGasolines.gasolines}</TableGasolines>
                </Col>
            </Row>
        </div>
    )
}

export default FormGasolina;