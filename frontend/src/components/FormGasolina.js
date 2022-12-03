import React, { useEffect, useState, useRef } from 'react';
import { Form, Row, Col, Alert, Button, InputGroup } from 'react-bootstrap';
import styles from '@styles/auth/Form.module.css';
import { useRouter } from 'next/router';
import { useAlert } from '@hooks/useAlert';
import { Formik, Field } from 'formik';
import Table from 'react-bootstrap/Table';
import Tools from '@services/api/Tools';
import DataTable from 'react-data-table-component';
import TableGasolines from './TableGasolines';
import { useAuth } from '@hooks/useAuth';
import { InputMilesKeyup, InputFormatMiles, QuitFormatMiles } from '@helps/useMiles';
import { dateNow } from '@helps/useDate';
import parse from 'html-react-parser';

import * as yup from 'yup';



const FormGasolina = () =>{


    const { alert, setAlert, toggleAlert } = useAlert();
    const { storeGasoline, getGasolines } = Tools();
    const { user } = useAuth();

    const [isValid, setIsValid] = useState(false);
    const [itemsGasolines, setItemsGasolines] = useState([]);
    const [dataTables, setdataTables] = useState([]);
    const [isReadyData, setIsReadyData] = useState(false);
    const [isChangeDelete, setIsChangeDelete] = useState(false);
    const [inputPriceMax, setInputPriceMax ] = useState(0);

 

    const dataGasoline = [
        {
            id: 1, 
            Fecha: '40/20/3003' , 
            Estacion: 'La bomba de la 5', 
            Precio: '12000'
        }
    ];

    const getFunctionGasolines = () =>{
        getGasolines().then((response)=>{
            setItemsGasolines(response.gasolines);
        });
    }

    useEffect(() => {
        if (alert.active && alert.autoClose) {
          setTimeout(() => {
            toggleAlert();
          }, 3000);
        }
    }, [alert]);

    useEffect(() =>{
        getFunctionGasolines();
    }, [isValid, isChangeDelete]);

    useEffect(() =>{
        getFunctionGasolines();
        console.log();
    }, []);

    useEffect(() =>{
        var JsonData = [];
        if(itemsGasolines.length > 0){
            for (let index = 0; index < itemsGasolines.length; index++) {
                const element = itemsGasolines[index];
                JsonData.push({
                    'Id': element.id,
                    'Fecha': element.date,
                    'Estacion' : element.station,
                    'PrecioXgalon': "$"+ InputFormatMiles(element.priceXgalon),
                    'Precio': "$"+ InputFormatMiles(element.price)
                });
            }
            setdataTables(JsonData);
        }

    }, [itemsGasolines]);

    useEffect(() =>{
        setIsReadyData(true);
    },[dataTables]);

    const handleSubmit = (event) => {
        event.preventDefault();
        var dates = event.target.date;
        var station = event.target.station;
        var price = event.target.price;
        var pricegalon = event.target.priceXgalon;
        var msg = "";
        var isValid = true;

        if(dates.value == "" || station.value == "" || pricegalon.value == "" ||price.value == ""){
            isValid = false;
            console.log("Campos vacios");
            if(dates.value == ""){
                msg += " Es obligatorio completar el campo ( Fecha ) <br>";
            }
            if(station.value == ""){
                msg += " Es obligatorio completar el campo ( Bomba ) <br>";
            }
            if(pricegalon.value == ""){
                msg += " Es obligatorio completar el campo ( Precio por Galon ) <br>";
            }
            if(price.value == ""){
                msg += " Es obligatorio completar el campo ( Precio ) <br>";
            }
        }

        const cantMaxPrice = pricegalon.value * user.motorbikes[0].tank_capacity;
        if(price.value > cantMaxPrice){
            isValid = false;
            msg += `El precio supera el valor de la compra maxima.`;
        }
        const FechaNow = dateNow();
        if(dates.value > FechaNow ){
            isValid = false;
            msg += `No puedes registrar gasolina en una fecha mayor que la de hoy!`;
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
                station: station.value,
                price: QuitFormatMiles(price.value),
                priceXgalon: QuitFormatMiles(pricegalon.value)
            }
    
            storeGasoline(data)
            .then((response) =>{
                setAlert({
                    active: true,
                    message: 'Has depositado gasolina correctamente.',
                    type: 'success',
                  });
                  setIsValid(true);

                  dates.value = '';
                  station.value = '';
                  price.value = '';
                  pricegalon.value = '';
                  setInputPriceMax(0);
        
            }).catch((error) =>{
                setAlert({
                    active: false,
                    message: 'Error al registrar el deposito de la gasolina.',
                    type: 'danger',
                  });
            });
        }
    }

    const handleKeyup = (e) =>{
        InputMilesKeyup(e);
        var priceXGalon = QuitFormatMiles(e.target.value);
        const priceXmax = priceXGalon * user.motorbikes[0].tank_capacity;
        setInputPriceMax(InputFormatMiles(priceXmax));
    }


    return (
        <div>

            <h5><i class="fas fa-tint mr-2"></i>Gasolina</h5>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className={`${styles.formGroup} mt-4`} controlId="date">
                                <Form.Label className={`${styles.formLabel}`}>Fecha de Registro <span>*</span></Form.Label>
                                <Form.Control  type="date" name="date" id="date"   placeholder="" className={`${styles.formControl}`}/>
                        </Form.Group>
                        <Form.Group className={`${styles.formGroup} mt-4`} controlId="station">
                                <Form.Label className={`${styles.formLabel}`}>Bomba <span>*</span></Form.Label>
                                <Form.Control  type="text" name="station"  id="station"  placeholder="" className={`${styles.formControl}`}  />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group className={`${styles.formGroup} mt-4`} controlId="priceXgalon">
                                        <Form.Label className={`${styles.formLabel}`}>Precio por Galon <span>*</span></Form.Label>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text id="priceXgalon-">$</InputGroup.Text>
                                            <Form.Control
                                            onKeyUp={handleKeyup}
                                            type="text"
                                            className={`${styles.formControl}`}
                                            placeholder=""
                                            aria-label=""
                                            aria-describedby="priceXgalon-"
                                            name="priceXgalon"  id="priceXgalon"
                                            />
                                        
                                        </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className={`${styles.formGroup} mt-4`} controlId="priceXgalon">
                                        <Form.Label className={`${styles.formLabel}`}>Capa.. del Tanque</Form.Label>
                                        <InputGroup className="mb-3">
                                            <Form.Control
                                            type="text"
                                            className={`${styles.formControl}`}
                                            placeholder=""
                                            aria-label=""
                                            aria-describedby="galon-"
                                            name="galon"  id="galon"
                                            disabled
                                            value={user.motorbikes[0].tank_capacity}
                                            />
                                            <InputGroup.Text id="galon-">Galones</InputGroup.Text>
                                        
                                        </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className={`${styles.formGroup} mt-4`} controlId="pricemax-">
                                        <Form.Label className={`${styles.formLabel}`}>Compra Maxima</Form.Label>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text id="pricemax-">$</InputGroup.Text>
                                            <Form.Control
                                            type="text"
                                            className={`${styles.formControl}`}
                                            placeholder=""
                                            aria-label=""
                                            aria-describedby="pricemax-"
                                            name="pricemax"  id="pricemax"
                                            disabled
                                            value={inputPriceMax}
                                            />                    
                                        </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className={`${styles.formGroup} mt-4`} controlId="price">
                                <Form.Label className={`${styles.formLabel}`}>Precio <span>*</span></Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="price-">$</InputGroup.Text>
                                    <Form.Control
                                    onKeyUp={InputMilesKeyup}
                                    type="text"
                                    className={`${styles.formControl}`}
                                    placeholder=""
                                    aria-label=""
                                    aria-describedby="price-"
                                    name="price"  id="price"
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
                        <TableGasolines setChangeDelete={setIsChangeDelete} Gasolines={dataTables} ></TableGasolines>
                </Col>
            </Row>
        </div>
    )
}

export default FormGasolina;