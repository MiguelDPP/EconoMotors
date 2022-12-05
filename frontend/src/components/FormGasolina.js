import React, { useEffect, useState, useRef } from 'react';
import { Form, Row, Col, Alert, Button, InputGroup, ProgressBar  } from 'react-bootstrap';
import styles from '@styles/auth/Form.module.css';
import loadWindows from './loadWindows.js';
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
    const { storeGasoline, getGasolines, getNecessaryGasoline } = Tools();
    const { user } = useAuth();

    const [isValid, setIsValid] = useState(false);
    const [itemsGasolines, setItemsGasolines] = useState([]);
    const [dataTables, setdataTables] = useState([]);
    const [isReadyData, setIsReadyData] = useState(false);
    const [isChangeDelete, setIsChangeDelete] = useState(false);
    const [inputPriceMax, setInputPriceMax ] = useState(0);
    const [stateTanque, setStateTanque] = useState({ tank : 0, galon : 0 });

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
    }, []);
    useEffect(() =>{
        ProgressGasoline();
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
            ProgressGasoline();
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
            if(dates.value == ""){
                msg += " Es obligatorio completar el campo <b>( Fecha ) </b><br>";
            }
            if(station.value == ""){
                msg += " Es obligatorio completar el campo <b>( Bomba ) </b><br>";
            }
            if(pricegalon.value == ""){
                msg += " Es obligatorio completar el campo <b>( Precio por Galon ) </b> <br>";
            }
            if(price.value == ""){
                msg += " Es obligatorio completar el campo <b>( Precio )</b> <br>";
            }
        }

        const cantMaxPrice = QuitFormatMiles(pricegalon.value) * stateTanque.galon;
        console.log("Precio maximo : " + cantMaxPrice);
        if(QuitFormatMiles(price.value) > cantMaxPrice){
            isValid = false;
            msg += `El precio supera el valor de la compra maxima.`;
        }
        const FechaNow = dateNow("-");
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
                    header: '<b>Muy bien!</b> <hr>',
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
        const priceXmax = Math.round(priceXGalon * stateTanque.galon);
        setInputPriceMax(InputFormatMiles(priceXmax));
    }

    
    function ProgressGasoline() {
        console.log(dateNow("/"));
        getNecessaryGasoline().then((response) =>{
            const procentage =  Math.round((response.gasoline * 100)/user.motorbikes[0].tank_capacity);
            console.log(procentage);
            const stateTanques =  100 - procentage;
            setStateTanque({tank : stateTanques, galon :(response.gasoline).toFixed(2) });
        });
    }


    return (
        <div>
            <h5><i className="fas fa-tint mr-2"></i>Gasolina</h5>
            <Row>
                <Col>
                <hr />
                <p>Estado del tanque (Necesita {stateTanque.galon != 0.00 ? stateTanque.galon : "0"} galones ) : </p>
                    <ProgressBar now={stateTanque.tank} label={`${stateTanque.tank}%`} />
                <hr />
                    { stateTanque.galon > 0 ? 
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className={`${styles.formGroup} mt-4`} controlId="exampleForm.date">
                                <Form.Label className={`${styles.formLabel}`}>Fecha de Registro <span>*</span></Form.Label>
                                <Form.Control  type="date" name="date" className={`${styles.formControl}`}/>
                        </Form.Group>
                        <Form.Group className={`${styles.formGroup} mt-4`} controlId="exampleForm.station">
                                <Form.Label className={`${styles.formLabel}`}>Bomba <span>*</span></Form.Label>
                                <Form.Control  type="text" name="station" className={`${styles.formControl}`}  />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group className={`${styles.formGroup} mt-4`} controlId="exampleForm.priceXgalon">
                                        <Form.Label className={`${styles.formLabel}`}>Precio por Galon <span>*</span></Form.Label>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text>$</InputGroup.Text>
                                            <Form.Control
                                            onKeyUp={handleKeyup}
                                            type="text"
                                            className={`${styles.formControl}`}
                                            name="priceXgalon" 
                                            />
                                        
                                        </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className={`${styles.formGroup} mt-4`} controlId="exampleForm.galon">
                                        <Form.Label className={`${styles.formLabel}`}>Capa.. del Tanque</Form.Label>
                                        <InputGroup className="mb-3">
                                            <Form.Control
                                            type="text"
                                            className={`${styles.formControl}`}
                                            placeholder=""
                                            aria-label=""
                                            aria-describedby="galon-"
                                            name="galon"  
                                            disabled
                                            value={stateTanque.galon}
                                            />
                                            <InputGroup.Text >Galones</InputGroup.Text>
                                        
                                        </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className={`${styles.formGroup} mt-4`} controlId="exampleForm.pricemax">
                                        <Form.Label className={`${styles.formLabel}`}>Compra Maxima</Form.Label>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text >$</InputGroup.Text>
                                            <Form.Control
                                            type="text"
                                            className={`${styles.formControl}`}
                                            placeholder=""
                                            aria-label=""
                                            aria-describedby="pricemax-"
                                            name="pricemax" 
                                            disabled
                                            value={inputPriceMax}
                                            />                    
                                        </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className={`${styles.formGroup} mt-4`} controlId="exampleForm.price">
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
                        <i className="fas fa-save mr-2"></i>Registrar
                        </Button>
                    </Form>
                    : <h4> El tanque de la moto esta lleno.</h4> }
                </Col>
                <Col>
                        <TableGasolines setChangeDelete={setIsChangeDelete} Gasolines={dataTables} ></TableGasolines>
                </Col>
            </Row>

        </div>
    )
}

export default FormGasolina;