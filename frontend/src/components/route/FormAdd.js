import React from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useAlert } from '@hooks/useAlert';
import Schedule from '@services/api/Schedule';

const FormAdd = ({ locateInitial, locateFinal, otherRoutes, distance }) => {
  const { alert, setAlert } = useAlert();

  const { storeSchedule } = Schedule();

  const schema = Yup.object().shape({
    origin: Yup.string().required('Campo requerido'),
    destination: Yup.string().required('Campo requerido'),
    date: Yup.string("Formato de fecha incorrecto"),
    days: Yup.array(),
    time: Yup.string("Formato de hora incorrecto").required('Campo requerido'),
  });

  const handleSubmit = (values) => {

    if (values.typeRecord == 1 && values.date == '') {
      setAlert({ type: 'danger', active:true, message: 'Debe ingresar una fecha' });
    }else if (values.typeRecord == 2 && values.days.length == 0) {
      setAlert({ type: 'danger', active:true, message: 'Debe seleccionar al menos un día' });
    }else {
      if (locateInitial == null || locateFinal == null) {
        setAlert({ type: 'danger', active:true, message: 'Debe ingresar una ruta' });
      }else if (distance == 0) {
        setAlert({ type: 'danger', active:true, message: 'Debe ingresar una ruta' });
      }else {
        let data = {
          origin: values.origin,
          destination: values.destination,
          lat_origin: locateInitial.lat,
          lng_origin: locateInitial.lng,
          lat_destination: locateFinal.lat,
          lng_destination: locateFinal.lng,
          distance: distance,
          type_record: values.typeRecord,
          time: values.time,
        }
        if (values.typeRecord == 1) {
          data.date = values.date;
        }else {
          data.days = values.days;
        }

        if (otherRoutes.length > 0) {
          data.other_routes = [];
          otherRoutes.map((item, index) => {
            data.other_routes.push({
              lat: item.route.lat,
              lng: item.route.lng,
            })
          })
        }

        storeSchedule(data).then((response) => {
          setAlert({ type: 'success', active:true, message: 'Se ha registrado correctamente' });
        })
        .catch((error) => {
          setAlert({ type: 'danger', active:true, message: 'Ha ocurrido un error' });
        })


      }

    }

    // alert(JSON.stringify(values));
  }
  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        origin: '',
        destination: '',
        typeRecord: '1',
        time: '',
        date: '',
        days: [],
      }}
    >
      {({
        handleSubmit,
        values,
        touched,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="origin">
                <Form.Label>Origen</Form.Label>
                <Field as={Form.Control} type="text" name="origin" isInvalid={!!errors.origin && touched.origin} />
                <Form.Control.Feedback type="invalid">
                  {errors.origin}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="destination">
                <Form.Label>Destino</Form.Label>
                <Field as={Form.Control} type="text" name="destination" isInvalid={!!errors.destination && touched.destination} />
                <Form.Control.Feedback type="invalid">
                  {errors.destination}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className='mt-3'>
            <Col>
              <Form.Group>
                <Form.Label>Tipo de registro</Form.Label>
                <Field as={Form.Select} name="typeRecord"
                >
                  <option value="1">Fecha especifica</option>
                  <option value="2">Frecuencia</option>
                </Field>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Fecha</Form.Label>
                <Field as={Form.Control} type="date" name="date" 
                  isInvalid={values.typeRecord === '1' && values.date === '' && touched.date}
                  disabled={values.typeRecord === '2'}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className='mt-3 mb-4'>
            <Col xs={6}>
              <Form.Group>
                <Form.Label>Dias</Form.Label>
                <div className='d-flex flex-wrap'>
                <Field as={Form.Check} type="checkbox" value="1" className='ml-1 mr-1' name="days" label="Lunes" disabled={values.typeRecord === '1'} 
                  isInvalid={values.typeRecord === '2' && values.days.length === 0 && touched.days}
                />
                <Field as={Form.Check} type="checkbox" value="2" className='ml-1 mr-1' name="days" label="Martes" disabled={values.typeRecord === '1'} 
                  isInvalid={values.typeRecord === '2' && values.days.length === 0 && touched.days}
                />
                <Field as={Form.Check} type="checkbox" value="3" className='ml-1 mr-1' name="days" label="Miercoles" disabled={values.typeRecord === '1'} 
                  isInvalid={values.typeRecord === '2' && values.days.length === 0 && touched.days}
                />
                <Field as={Form.Check} type="checkbox" value="4" className='ml-1 mr-1' name="days" label="Jueves" disabled={values.typeRecord === '1'} 
                  isInvalid={values.typeRecord === '2' && values.days.length === 0 && touched.days}
                />
                <Field as={Form.Check} type="checkbox" value="5" className='ml-1 mr-1' name="days" label="Viernes" disabled={values.typeRecord === '1'} 
                  isInvalid={values.typeRecord === '2' && values.days.length === 0 && touched.days}
                />
                <Field as={Form.Check} type="checkbox" value="6" className='ml-1 mr-1' name="days" label="Sabado" disabled={values.typeRecord === '1'} 
                  isInvalid={values.typeRecord === '2' && values.days.length === 0 && touched.days}
                />
                <Field as={Form.Check} type="checkbox" value="7" className='ml-1 mr-1' name="days" label="Domingo" disabled={values.typeRecord === '1'} 
                  isInvalid={values.typeRecord === '2' && values.days.length === 0 && touched.days}
                />
                </div>
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group>
                <Form.Label>Horario</Form.Label>
                <Field as={Form.Control} type="time" name="time" 
                  isInvalid={!!errors.time && touched.time}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.time}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {alert.active && <Alert className='' variant={alert.type}>{alert.message}</Alert>}

          <Button className='' type="submit">Agregar</Button>
        </Form>
      )}
    </Formik>


  )
}

export default FormAdd