import React, { useEffect, useState, useMemo } from 'react';
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
import TableTecnomecanical from './TableTecnomecanical';
import * as yup from 'yup';

const FormTecnomecanica = () =>{

    const { alert, setAlert, toggleAlert } = useAlert();
    const { storeTecnomecanical, getTecnomecanical } = Tools();
    const [isValid, setIsValid] = useState(false);
    const { user } = useAuth();
    const [isChangeDelete, setIsChangeDelete] = useState(false);
    const [dataTables, setdataTables] = useState([]);
    const [itemsTecno, setItemsTecno] = useState([]);
    const [numPeticion, setnumPeticion]= useState(false);

    const getFunctionTecno = (value) =>{
        setnumPeticion(!numPeticion);
        getTecnomecanical().then((response)=>{
            console.log("Entrando 2 : ..");
            console.log(response);
            setItemsTecno(response.technomechanicals);
        });

    }

    useEffect(() =>{
        console.log("Entrando 1 vez");
        getFunctionTecno(true);
    }, []);


    useEffect(() =>{
        var JsonData = [];
        if(itemsTecno.length > 0){
            for (let index = 0; index < itemsTecno.length; index++) {
                const element = itemsTecno[index];
                JsonData.push({
                    'Id': element.id,
                    'Fecha': element.date,
                    'Descripcion' : element.description,
                    'Precio': "$"+ InputFormatMiles(element.price)
                });
            }
            setdataTables(JsonData);
        }

    }, [itemsTecno]);


    useEffect(() =>{
        if(!numPeticion){
            console.log("Por aqui no entro.");
            getFunctionTecno(true);
        }
    }, [isValid, isChangeDelete]);


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
        var isValids = true;

        if(dates.value == "" || description.value == "" || price.value == ""){
            isValids = false;
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
            isValids = false;
            msg += " No puedes registrar la tecnomecanica en una fecha mayor que la de hoy! </b><br>";
        }

        if(!isValids){
            setAlert({
                active: true,
                message: msg,
                type: 'danger',
            });
        }

        if(isValids){
            const data = { 
                moto_id: user.motorbikes[0].id,
                date: dates.value,
                description: description.value,
                price: QuitFormatMiles(price.value),
            }
    
            storeTecnomecanical(data)
            .then((response) =>{
                setAlert({
                    active: true,
                    message: 'Has registrado la tecnomecanica correctamente.',
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
                    message: 'Error al registrar la tecnomecanica',
                    type: 'danger',
                  });
            });
        }
    }

    const getYearNext = (dates) =>{
        const array = dates.split('-');
        const year = parseInt(array[0]) + 1;
        return year+ "-"+ array[1] + "-"+array[2];
    }

    return (
        <div>

            <h5><i class="fas fa-oil-can mr-2"></i>Registro de Tecnomecanica</h5>
            <Row>
                <Col>
                    {dataTables.length == 0 || (dataTables[dataTables.length-1] != null && dataTables[dataTables.length-1].Fecha >= dateNow("-")) ?
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
                    : <p>
                        <br></br>
                        <p className={styles.colorWarning}><i class="fas fa-star"></i> Tecnomecanica Vigente </p>
                        <p>Fecha de registro : <b>{dataTables[dataTables.length-1].Fecha}</b></p>
                        <p>Descripcion : <b>{dataTables[dataTables.length-1].Descripcion}</b></p>
                        <p>Precio : <b>{dataTables[dataTables.length-1].Precio}</b></p>
                        <p className={styles.colorPrimary}>Fecha de renovación : <b>{getYearNext(dataTables[dataTables.length-1].Fecha)}</b></p>
                        </p>
                    } 
                </Col>
                <Col>
                    <TableTecnomecanical numPeticion={numPeticion} setnumPeticion={setnumPeticion} changeDelete={isChangeDelete} setChangeDelete={setIsChangeDelete} Tecno={dataTables} ></TableTecnomecanical>
                </Col>
            </Row>
        </div>
    )
}

export default FormTecnomecanica;