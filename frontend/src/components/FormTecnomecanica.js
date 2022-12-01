import React, { useEffect } from 'react';
import { Form, Row, Col, Alert, Button, FloatingLabel } from 'react-bootstrap';
import styles from '@styles/auth/Form.module.css';
import { useRouter } from 'next/router';
import { useAlert } from '@hooks/useAlert';
import { Formik, Field } from 'formik';
import Table from 'react-bootstrap/Table';
import * as yup from 'yup';

const FormTecnomecanica = () =>{
    return (
        <div>
            <h5><i class="fas fa-motorcycle mr-2"></i>Tecnomecanica</h5>
            <Formik>
                    <Form>
                        <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                                <Form.Label className={`${styles.formLabel}`}>Fecha de Registro <span>*</span></Form.Label>
                                <Field as={Form.Control}  type="date" name="name" id="name"  placeholder="" className={`${styles.formControl}`} />
                        </Form.Group>
                        <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                                <Form.Label className={`${styles.formLabel}`}>Descripción <span>*</span></Form.Label>
                                <FloatingLabel controlId="floatingTextarea2">
                                    <Field as={Form.Control} className={`${styles.textArea}`}
                                    as="textarea"
                                    placeholder="Detalla el procedimiento!! Aqui"
                                    style={{ height: '100px' }}
                                    />
                                </FloatingLabel>
                        </Form.Group>
                        <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                                <Form.Label className={`${styles.formLabel}`}>Precio <span>*</span></Form.Label>
                                <Field as={Form.Control}  type="text" name="name" id="name"  placeholder="" className={`${styles.formControl}`} />
                        </Form.Group>
                        <Button type="submit" variant="warning" className={`mt-3`}>
                        <i class="fas fa-save mr-2"></i>Registrar
                        </Button>
                    </Form>
            </Formik>
        </div>
    )
}

export default FormTecnomecanica;