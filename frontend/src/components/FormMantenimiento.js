import React, { useEffect } from 'react';
import styles from '@styles/auth/Form.module.css';
import { Form, Row, Col, Alert, Button } from 'react-bootstrap';
import Image from 'next/image';
import bg from '@images/bg3.png';
import Link from 'next/link';
import { useAuth } from '@hooks/useAuth';
import { useRouter } from 'next/router';
import { useAlert } from '@hooks/useAlert';
import { Formik, Field } from 'formik';
import Table from 'react-bootstrap/Table';
import * as yup from 'yup';

const FormMantenimiento = () => {

  return (
    <div>
        <h3 className={`${styles.formTitle}`}><i class="fas fa-tools mr-2"></i>Perfil</h3>
        <div>
            <Button className='ml-2' variant="warning" size="sm">
            <i class="fas fa-tint mr-2"></i> Gasolina
            </Button>
            <Button className='ml-2' variant="warning" size="sm">
                <i class="fas fa-oil-can mr-2"></i> Aceites
            </Button>
            <Button className='ml-2' variant="warning" size="sm">
                <i class="fas fa-tools mr-2"></i>Tecnomecanica
            </Button>
        </div>
        <Row>
            <Col>
                <Formik>
                    <Form>
                        <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                                <Form.Label className={`${styles.formLabel}`}>Fecha de Registro <span>*</span></Form.Label>
                                <Field as={Form.Control}  type="text" name="name" id="name"  placeholder="" className={`${styles.formControl}`} />
                        </Form.Group>
                        <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                                <Form.Label className={`${styles.formLabel}`}>Descripcion <span>*</span></Form.Label>
                                <Field as={Form.Control}  type="text" name="name" id="name"  placeholder="" className={`${styles.formControl}`} />
                        </Form.Group>
                    </Form>
                </Formik>
            </Col>
            <Col>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td colSpan={2}>Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
                </Table>
            </Col>
        </Row>
    </div>
  )
}

export default FormMantenimiento