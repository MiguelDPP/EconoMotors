import React, { useEffect, useState, useRef } from 'react';
import { Form, Row, Col, Alert, Button } from 'react-bootstrap';
import styles from '@styles/auth/Form.module.css';
import { useRouter } from 'next/router';
import { useAlert } from '@hooks/useAlert';
import { Formik, Field } from 'formik';
import Table from 'react-bootstrap/Table';
import Tools from '@services/api/Tools';
import DataTable from 'react-data-table-component';
import TableGasolines from './TableGasolines';
import { useAuth } from '@hooks/useAuth';
import * as yup from 'yup';



const FormGasolina = () =>{


    const { alert, setAlert, toggleAlert } = useAlert();
    const { storeGasoline, getGasolines } = Tools();
    const { user } = useAuth();

    const [isValid, setIsValid] = useState(false);
    const [itemsGasolines, setItemsGasolines] = useState([]);
    const [dataTables, setdataTables] = useState([]);
    const [isReadyData, setIsReadyData] = useState(false);

 

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
    }, [isValid]);

    useEffect(() =>{
        getFunctionGasolines();
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
                    'PrecioXgalon': element.priceXgalon,
                    'Precio': element.price
                });
            }
            setdataTables(JsonData);
        }

    }, [itemsGasolines]);

    useEffect(() =>{
        setIsReadyData(true);
    },[dataTables]);





    const handleChangeMaxPrice = (event) =>{
        console.log("Hay cambio..");
    };  


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
                msg += " Es obligatorio completar el campo ( Fecha ), ";
            }
            if(station.value == ""){
                msg += " Es obligatorio completar el campo ( Bomba ), ";
            }
            if(pricegalon.value == ""){
                msg += " Es obligatorio completar el campo ( Precio por Galon ), ";
            }
            if(price.value == ""){
                msg += " Es obligatorio completar el campo ( Precio )";
            }
        }

        const cantMaxPrice = pricegalon.value * user.motorbikes[0].tank_capacity;
        if(price.value > cantMaxPrice){
            isValid = false;
            msg += `El precio supera el valor maximo de galones que puede tanquear $${cantMaxPrice}`;
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
                date: dates.value,
                station: station.value,
                price: price.value,
                priceXgalon: pricegalon.value
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
                  pricegalon = '';
        
            }).catch((error) =>{
                setAlert({
                    active: false,
                    message: 'Error al registrar el deposito de la gasolina.',
                    type: 'danger',
                  });
            });
        }
    }

    const handleKeyPress = (event) =>{
        const  val = (event.target.value).replace(/,/g, '');
        //console.log(new Intl.NumberFormat().format(event.target.value));
        event.target.value = new Intl.NumberFormat().format(event.target.value);
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
                                
                        <Form.Group className={`${styles.formGroup} mt-4`} controlId="priceXgalon">
                                <Form.Label className={`${styles.formLabel}`}>Precio por Galon <span>*</span></Form.Label>
                                <Form.Control onKeyPress={handleKeyPress} type="text" name="priceXgalon"  id="priceXgalon"  placeholder="" className={`${styles.formControl}`}  />
                        </Form.Group>
                        <Form.Group className={`${styles.formGroup} mt-4`} controlId="price">
                                <Form.Label className={`${styles.formLabel}`}>Precio <span>*</span></Form.Label>
                                <Form.Control type="text" name="price" id="price"  placeholder="" className={`${styles.formControl}`}  />
                        </Form.Group>

                        { alert && <Alert variant={alert.type}>{alert.message}</Alert> }

                        <Button type="submit" variant="warning" className={`mt-3`}>
                        <i class="fas fa-save mr-2"></i>Registrar
                        </Button>
                    </Form>
                </Col>
                <Col>
                        <TableGasolines Gasolines={dataTables} ></TableGasolines>
                </Col>
            </Row>
        </div>
    )
}

export default FormGasolina;