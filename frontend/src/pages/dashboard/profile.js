import React, { useEffect } from 'react';
import styles from '@styles/Perfil.module.css';
import { Form, Row, Col, Image, } from 'react-bootstrap';

const perfil = () => {

  return (
    <Form className={`${styles.form}`}>
        
        <h3 className={`${styles.formTitle}`}><i className="fas fa-user mr-2 mt-4"></i>Perfil</h3>
        <Row>
            <Col>
                <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                <Form.Label className={`${styles.formLabel}`}>Nombre <span>*</span></Form.Label>
                <Form.Control type="text" name="name" id="name"  placeholder="" className={`${styles.formControl}`}
                />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                <Form.Label className={`${styles.formLabel}`}>Apellido <span>*</span></Form.Label>
                <Form.Control type="text" name="lastname" id="lastname"  placeholder="" className={`${styles.formControl}`}
                />
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                <Form.Label className={`${styles.formLabel}`}>Correo <span>*</span></Form.Label>
                <Form.Control type="email" name="email" id="email"  placeholder="" className={`${styles.formControl}`}
                />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                <Form.Label className={`${styles.formLabel}`}>Telefono <span>*</span></Form.Label>
                <Form.Control type="number" name="phone" id="phone"  placeholder="" className={`${styles.formControl}`}
                />
                </Form.Group>
            </Col>
        </Row>
        
        <Row>
            <Col>
                <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                <Form.Label className={`${styles.formLabel}`}>Genero <span>*</span></Form.Label>
                <Form.Select className={`${styles.formControl}`} name="sexo" id="sexo" >
                          <option value="1">Femenino</option>
                          <option value="2">Masculino</option>
                </Form.Select>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail">
                <Form.Label className={`${styles.formLabel}`}>Contraseña <span>*</span></Form.Label>
                <Form.Control type="password" name="password" id="password"  placeholder="" className={`${styles.formControl}`}
                />
                </Form.Group>
            </Col>
        </Row>
        <button className={`${styles.formButton} btn mt-4`}><i class="fas fa-save mr-2"></i>Actualizar</button>
    </Form>
  )
}

export default perfil