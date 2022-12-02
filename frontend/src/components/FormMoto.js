import React, { useEffect, useState } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { Form, Row, Col, Card, Button, Image, Alert } from 'react-bootstrap';
import styles from '@styles/auth/Form.module.css';
import moto from '@images/Moto/notMotor.webp';
import endPoints from '@services/api';
import axios from 'axios';
import { useAlert } from '@hooks/useAlert';
import Motor from '@services/api/Motor';
import { useAuth } from '@hooks/useAuth';

const FormMoto = () => {

  const { storeMotorcycle, updateMotorcycle } = Motor();

  const { user, getUser } = useAuth();

  const handleSubmit = (values) => {
    if (motoSelect == null) {
      setAlert({
        active: true,
        message: 'Debe seleccionar una moto',
        type: 'danger',
      });
    }else {
      setAlert({
        active: false,
        message: '',
        type: '',
      });

      console.log(values);

      const data = {
        'presentation_id': motoSelect.id,
        'year': values.year,
        'purchase_date': values.purchase_date,
        'mileage': values.mileage,
      }

      if (user.motorbikes[0] == null) {
        storeMotorcycle(data)
        .then((response) => {
          setAlert({
            active: true,
            message: 'Moto registrada correctamente',
            type: 'success',
          });

          getUser();

        })
        .catch((error) => {
          setAlert({
            active: true,
            message: 'Error al registrar la moto',
            type: 'danger',
          });
        });
      }else {
        updateMotorcycle(data)
        .then((response) => {
          setAlert({
            active: true,
            message: 'Moto actualizada correctamente',
            type: 'success',
          });

          getUser();

        })
        .catch((error) => {
          setAlert({
            active: true,
            message: 'Error al actualizar la moto',
            type: 'danger',
          });
        });
      }
      
    }
  }

  const [brands, setBrands] = useState(null);
  const [models, setModels] = useState(null);
  const [presentations, setPresentations] = useState(null);
  const [motoSelect, setMotoSelect] = useState(user.motorbikes[0]);
  const {alert, setAlert, toggleAlert} = useAlert();

  useEffect(() => {
    axios.get(endPoints.moto.brands)
      .then((response) => {
        setBrands(response.data.data);
        setPresentations(null);
      })
      .catch((error) => {
        setBrands(null);
        console.log(error);
      })
  }, []);

  const handleChangeBrand = (e) => {
    const brand = e.target.value;
    axios.get(endPoints.moto.motor(brand))
      .then((response) => {
        setModels(response.data.data);
        setMotoSelect(null);
        setPresentations(null);
      })
      .catch((error) => {
        setModels(null);
        setPresentations(null);
        console.log(error);
      })
  }

  const handleChangeMoto = (e) => {
    const moto = e.target.value;
    axios.get(endPoints.moto.presentations(moto))
      .then((response) => {
        setPresentations(response.data.data);
      })
      .catch((error) => {
        setPresentations(null);
        console.log(error);
      })
  }

  const handleChangePresentation = (e) => {
    const presentation = e.target.value;

    const moto = presentations.find((moto) => moto.id == presentation);
    setMotoSelect(moto);
  }

  const schema = Yup.object().shape({
    // brand: Yup.number().min(1).required('Campo obrigatorio'),
    // moto: Yup.number().min(1).required('Campo obrigatorio'),
    year: Yup.number().min(1000).required('Dato invalido'),
    purchase_date: Yup.date().required('Campo obrigatorio'),
    // date_change_oil: Yup.date().required('Campo obrigatorio'),
    // date_gazoline: Yup.date().required('Campo obrigatorio'),
    // price_gazoline: Yup.number().min(1).required('Campo obrigatorio'),
    mileage: Yup.number().min(1).required('Campo obrigatorio'),
    // date_technomechanics: Yup.date(),

  });
  return (
    <Row>
      <Col xs={6}>
        <Card>
          <Card.Header>
            <Card.Title>Informacion de tu moto</Card.Title>
          </Card.Header>
          <Card.Body>
            <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              // brand: '',
              // moto: '',
              presentation: '',
              year: (user.motorbikes[0] != null) ? user.motorbikes[0].pivot.year : '',
              purchase_date: (user.motorbikes[0] != null) ? user.motorbikes[0].pivot.purchase_date : '',
              mileage: (user.motorbikes[0] != null) ? user.motorbikes[0].mileage_record.mileage : '',
            }}
          >
            {({
              handleSubmit,
              touched,
              values,
              errors,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col xs={6}>
                    <Form.Group  className={`${styles.formGroup}`} controlId="formPlaintextEmail">
                      <Form.Label sm="2" className={`${styles.formLabel}`}>
                        Marca <span>*</span>
                      </Form.Label>
                      <Form.Select name="brand" as={Col} sm="10"
                        onChange={handleChangeBrand}
                      >
                        <option value="0">Seleccione una marca</option>
                        {brands && brands.map((brand) => (
                          <option key={brand.id} value={brand.id}>{brand.name}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group  className={`${styles.formGroup}`} controlId="formPlaintextEmail">
                      <Form.Label sm="2" className={`${styles.formLabel}`}>
                        Moto <span>*</span>
                      </Form.Label>
                      <Form.Select name="moto" as={Col} sm="10"
                        onChange={handleChangeMoto}
                      >
                        <option value="0">Seleccione una moto</option>
                        {models && models.map((model) => (
                          <option key={model.id} value={model.id}>{model.name}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='mt-3'>
                  <Col xs={6}>
                    <Form.Group  className={`${styles.formGroup}`} controlId="formPlaintextEmail">
                      <Form.Label sm="2" className={`${styles.formLabel}`}>
                        Presentacion
                      </Form.Label>
                      <Form.Select name="presentation" as={Col} sm="10"
                        onChange={handleChangePresentation}
                      >
                        <option value="0">Seleccione una presentacion</option>
                        {presentations && presentations.map((presentation) => (
                          <option key={presentation.id} value={presentation.id}>{presentation.name}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xs={3}>
                    <Form.Group  className={`${styles.formGroup}`} controlId="formPlaintextEmail">
                      <Form.Label sm="2" className={`${styles.formLabel}`}>
                        Año <span>*</span>
                      </Form.Label>
                      <Field as={Form.Control} name="year" type="number" placeholder="Año" 
                        isInvalid={touched.year && !!errors.year}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={3}>
                    <Form.Group  className={`${styles.formGroup}`} controlId="formPlaintextEmail">
                      <Form.Label sm="2" className={`${styles.formLabel}`}>
                        Fecha de compra <span>*</span>
                      </Form.Label>
                      <Field as={Form.Control} name="purchase_date" type="date" placeholder="Fecha de compra" 
                        isInvalid={touched.purchase_date && !!errors.purchase_date}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                {/* <Row className='mt-3'>
                  <Col xs={6}>
                    <Form.Group  className={`${styles.formGroup}`} controlId="formPlaintextEmail">
                      <Form.Label sm="2" className={`${styles.formLabel}`}>
                        Cambio de aceite <span>*</span>
                      </Form.Label>
                      <Form.Control name="date_change_oil" type="date" placeholder="Fecha de cambio de aceite" />
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group  className={`${styles.formGroup}`} controlId="formPlaintextEmail">
                      <Form.Label sm="2" className={`${styles.formLabel}`}>
                        Cambio de gasolina <span>*</span>
                      </Form.Label>
                      <Form.Control name="date_gazoline" type="date" placeholder="Fecha de cambio de gasolina" />
                    </Form.Group>
                  </Col>
                </Row> */}
                <Row className='mt-3'>
                  {/* <Col xs={3}>
                    <Form.Group  className={`${styles.formGroup}`} controlId="formPlaintextEmail">
                      <Form.Label sm="2" className={`${styles.formLabel}`}>
                        Precio de gasolina <span>*</span>
                      </Form.Label>
                      <Form.Control name="price_gazoline" type="number" placeholder="Precio de gasolina" />
                    </Form.Group>
                  </Col> */}
                  <Col xs={3}>
                    <Form.Group  className={`${styles.formGroup}`} controlId="formPlaintextEmail">
                      <Form.Label sm="2" className={`${styles.formLabel}`}>
                        Kilometraje <span>*</span>
                      </Form.Label>
                      <Field as={Form.Control} name="mileage" type="number" placeholder="Kilometraje" 
                        isInvalid={touched.mileage && !!errors.mileage}
                        // Desabilitar
                        disabled={(user.motorbikes[0] != null) ? true : false}
                      />
                    </Form.Group>
                  </Col>
                  {/* <Col xs={6}>
                    <Form.Group  className={`${styles.formGroup}`} controlId="formPlaintextEmail">
                      <Form.Label sm="2" className={`${styles.formLabel}`}>
                        Fecha de tecnomecanica
                      </Form.Label>
                      <Form.Control name="date_technomechanics" type="date" placeholder="Fecha de tecnomecanica" />
                    </Form.Group>
                  </Col> */}
                  
                </Row>
                { alert.active && <Alert className='mt-4' variant={alert.type}>{alert.message}</Alert> }

                <Row className='mt-4'>
                  <Col xs={12}>
                    <Button type="submit" variant="primary" className={`${styles.button}`}>
                      {user.motorbikes.length > 0 ? 'Actualizar' : 'Guardar'}
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card>
          <Card.Header>
            <Card.Title>Vista previa</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col xs={6} className='d-flex align-items-center'>
                <Image src={motoSelect?motoSelect.path:moto.src} fluid />
              </Col>
              <Col xs={6}>
                <h3 className='text-center'>Ficha tecnica</h3>
                <p><strong>Marca:</strong> <span>{user.motorbikes[0]?user.motorbikes[0].motorcycle.brand.name:'-'}</span></p>
                <p><strong>Moto:</strong> <span>{user.motorbikes[0]?user.motorbikes[0].motorcycle.name:'-'}</span></p>
                <p><strong>Presentacion:</strong> <span>{user.motorbikes[0]?user.motorbikes[0].name:'-'}</span></p>
                <p><strong>Año:</strong> <span>{user.motorbikes[0]?user.motorbikes[0].pivot.year:'-'}</span></p>
                <p><strong>Cilindraje:</strong> <span>{user.motorbikes[0]?user.motorbikes[0].cylinder_capacity:'-'} cc</span></p>
                <p><strong>Kilometros por Galon:</strong> <span>{user.motorbikes[0]?user.motorbikes[0].miles_per_gallon:'-'} km</span></p>
                <p><strong>Capacidad del tanque:</strong> <span>{user.motorbikes[0]?user.motorbikes[0].tank_capacity:'-'} gal</span></p>
              </Col>
            </Row>
            <Row>
              <h3 className='text-center mt-4 pb-1'>Datos de la moto</h3>
              {/* Linea Divisora */}
              <Row className='mt-1'>
                <Col xs={6}>
                  <p><strong>Fecha de compra:</strong> <span>{user.motorbikes[0]?user.motorbikes[0].pivot.purchase_date:'-'}</span></p>
                </Col>
                <Col xs={6}>
                  <p><strong>Fecha de cambio de aceite:</strong> <span>-</span></p>
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <p><strong>Fecha de cambio de gasolina:</strong> <span>-</span></p>
                </Col>
                <Col xs={6}>
                  <p><strong>Precio de gasolina:</strong> <span>-</span></p>
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <p><strong>Kilometraje:</strong> <span>{(user.motorbikes[0] != null) ? user.motorbikes[0].mileage_record.mileage + ' km' : '-'}</span></p>
                </Col>
                <Col xs={6}>
                  <p><strong>Fecha de tecnomecanica:</strong> <span>-</span></p>
                </Col>
              </Row>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default FormMoto;