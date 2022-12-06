import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Alert, Button, FloatingLabel, InputGroup } from 'react-bootstrap';
import { InputMilesKeyup, InputFormatMiles, QuitFormatMiles } from '@helps/useMiles';
import styles from '@styles/auth/Form.module.css';
import { useRouter } from 'next/router';
import { useAlert } from '@hooks/useAlert';
import { Formik, Field } from 'formik';
import Table from 'react-bootstrap/Table';
import Tools from '@services/api/Tools';
import parse from 'html-react-parser';
import { dateNow } from '@helps/useDate';
import { useAuth } from '@hooks/useAuth';
import TableOils from './TableOils';
import * as yup from 'yup';

const FormAceite = () =>{

    const { alert, setAlert, toggleAlert } = useAlert();
    const { storeOil, getOils } = Tools();
    const [isValid, setIsValid] = useState(false);
    const { user } = useAuth();
    const [isChangeDelete, setIsChangeDelete] = useState(false);
    const [dataTables, setdataTables] = useState([]);
    const [itemsOils, setItemsOils] = useState([]);
    const [numPeticion, setnumPeticion]= useState(false);


    //Realiza Peticiones al servidor
    const getFunctionOils = () =>{
        console.log("Funcion Original");
        setnumPeticion(!numPeticion);
        getOils().then((response)=>{
            setItemsOils(response.Oils);
        });
    }
    
    useEffect(() =>{
        console.log("Solo una vez");
        //La llamo y se debe ejecutar una vez
        getFunctionOils();
    }, []);

    useEffect(() =>{
        var JsonData = [];
        if(itemsOils.length > 0){
            for (let index = 0; index < itemsOils.length; index++) {
                const element = itemsOils[index];
                JsonData.push({
                    'Id': element.id,
                    'Fecha': element.date,
                    'Descripcion' : element.description,
                    'Precio': "$"+ InputFormatMiles(element.price)
                });
            }
            setdataTables(JsonData);
        }

    }, [itemsOils]);


    useEffect(() =>{
        if(!numPeticion){
            //La llamo y se debe ejecutar cuando sea valido y halla un cambio
            getFunctionOils();
        }
    }, [isValid, isChangeDelete]);


    //Cuando halla un cambio en la alerta pues que se muestre
    useEffect(() => {
        if (alert.active && alert.autoClose) {
          setTimeout(() => {
            toggleAlert();
          }, 3000);
        }
    }, [alert]);


    const handleSubmit = (event) => {

        event.preventDefault();
        var dates = event.target.date;
        var description = event.target.description;
        var price = event.target.price;
        var msg = "";
        var isValid = true;

        if(dates.value == "" || description.value == "" || price.value == ""){
            isValid = false;
            if(dates.value == ""){
                msg += " Es obligatorio completar el campo <b>( Fecha ) </b><br>";
            }
            if(description.value == ""){
                msg += " Es obligatorio completar el campo <b>( Descripcion ) </b><br>";
            }
            if(price.value == ""){
                msg += " Es obligatorio completar el campo <b>( Precio )</b> <br>";
            }
        }

        const FechaNow = dateNow("-");
        if(dates.value > FechaNow ){
            isValid = false;
            msg += " No puedes registrar Aceite en una fecha mayor que la de hoy! </b><br>";
        }

        if(!isValid){
            setAlert({
                active: true,
                message: msg,
                type: 'danger',
            });
        }

        if(isValid){
            const data = { 
                moto_id: user.motorbikes[0].id,
                date: dates.value,
                description: description.value,
                price: QuitFormatMiles(price.value),
            }
    
            storeOil(data)
            .then((response) =>{
                setAlert({
                    active: true,
                    message: 'Has depositado Aceite correctamente a tu moto.',
                    type: 'success',
                });

                setIsValid(!isValid);
                setnumPeticion(!numPeticion);
                dates.value = '';
                description.value = '';
                price.value = '';
        
            }).catch((error) =>{
                setAlert({
                    active: false,
                    message: 'Error al registrar el deposito de Aceite.',
                    type: 'danger',
                  });
            });
        }
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

                        <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail.date">
                            <Form.Label className={`${styles.formLabel}`}>Descripción <span>*</span></Form.Label>
                            <FloatingLabel controlId="floatingTextarea2">
                                <Form.Control
                                type="textarea"
                                placeholder="Detalles de la compra"
                                style={{ height: '100px' }}
                                name="description" 
                                />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className={`${styles.formGroup} mt-4`} controlId="formBasicEmail.price">
                                <Form.Label className={`${styles.formLabel}`}>Precio <span>*</span></Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text >$</InputGroup.Text>
                                    <Form.Control
                                    onKeyUp={InputMilesKeyup}
                                    type="text"
                                    className={`${styles.formControl}`}
                                    placeholder=""
                                    aria-label=""
                                    name="price"  
                                    />
                                </InputGroup>
                        </Form.Group>

                        

                        { alert && <Alert variant={alert.type}>{parse(alert.message)}</Alert> }
                        
                        <Button type="submit" variant="warning" className={`mt-3`}>
                            <i class="fas fa-save mr-2"></i>Registrar
                        </Button>
                    </Form> 
                </Col>
                <Col>
                    <TableOils numPeticion={numPeticion} setnumPeticion={setnumPeticion} changeDelete={isChangeDelete} setChangeDelete={setIsChangeDelete} Oils={dataTables} ></TableOils>
                </Col>
            </Row>
        </div>
    )
}

export default FormAceite;