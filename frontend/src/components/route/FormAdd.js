import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useAlert } from '@hooks/useAlert';
import Schedule from '@services/api/Schedule';

const FormAdd = ({
  locateInitial,
  // setLocateInitial, 
  locateFinal,
  // setLocateFinal, 
  otherRoutes,
  // setOtherRouter, 
  distance,
  // setDistance 
  handleDelete,
  pullData,
  isEdit,
  setIsEdit,
  dataEdit,
  setDataEdit,
  checkOtherRoutes,
}) => {
  const { alert, setAlert } = useAlert();
  const form = useRef(null);

  const [Datico, setDatico] = useState(null);

  const { storeSchedule, updateSchedule } = Schedule();

  // const schema = Yup.object().shape({
  //   origin: Yup.string().required('Campo requerido'),
  //   destination: Yup.string().required('Campo requerido'),
  //   date: Yup.string("Formato de fecha incorrecto"),
  //   days: Yup.array(),
  //   time: Yup.string("Formato de hora incorrecto").required('Campo requerido'),
  // });

  const handleCancel = () => {
    handleDelete('all');
    setIsEdit(false);
    setDataEdit(null);
    form.current.values.origin = '';
    form.current.values.destination = '';
    form.current.values.date = '';
    form.current.values.days = [];
    form.current.values.time = '';
    form.current.values.dateStart = '';
    form.current.values.dateEnd = '';
  }

  if (Button.current) {
    Button.current.disabled = false;
  }

  useEffect(() => {
    if (isEdit && dataEdit) {
      setDatico("Hola");

      form.current.values.origin = dataEdit.origin;
      form.current.values.destination = dataEdit.destination;
      form.current.values.date = dataEdit.date;
      form.current.values.typeRecord = dataEdit.type_record;
      form.current.values.time = dataEdit.time;
      // form.current.setFieldValue('origin', dataEdit.origin);
      // form.current.setFieldValue('destination', dataEdit.destination);
      // form.current.setFieldValue('date', dataEdit.date);
      // form.current.setFieldValue('typeRecord', dataEdit.type_record);
      // // if ()
      // console.log(dataEdit);
      let days = [];
      dataEdit.day_schedules.map((item) => {
        days.push(item.day);
      });

      form.current.values.days = days;
      form.current.values.dateStart = dataEdit.date_start;
      form.current.values.dateEnd = dataEdit.date_end;

      // validar formulario
      // form.current.validateForm();
      // form.current.handleSubmit = handleSubmit;
      // form.current.setFieldValue('days', days);
      // form.current.setFieldValue('time', dataEdit.time);
    }else {
      handleCancel();
    }
  }, [isEdit, dataEdit]);

  const handleSubmit = (values) => {
    console.log(values);
    if (values.origin == '' || values.destination == '' || values.time == '') {
      setAlert({
        type: 'danger',
        active: true,
        message: "Campos sin llenar",
      });
    } else if (values.typeRecord == '1' && (values.date == '' || values.date == null)) {
      setAlert({
        type: 'danger',
        active: true,
        message: "Ingresar fecha",
      });
    } else if (values.typeRecord == '2' && (
      (values.days == '' || values.days == null) || 
      (values.dateStart == '' || values.dateStart == null) ||
      (values.dateEnd == '' || values.dateEnd == null))) { 
      
      setAlert({
        type: 'danger',
        active: true,
        message: "Completar datos",
      });
     
    } else {
      if (values.typeRecord == 1 && values.date == '') {
        setAlert({ type: 'danger', active: true, message: 'Debe ingresar una fecha' });
      } else if (values.typeRecord == 2 && values.days.length == 0) {
        setAlert({ type: 'danger', active: true, message: 'Debe seleccionar al menos un día' });
      } else {
        if (locateInitial == null || locateFinal == null) {
          setAlert({ type: 'danger', active: true, message: 'Debe ingresar una ruta' });
        } else if (distance == 0) {
          setAlert({ type: 'danger', active: true, message: 'Debe ingresar una ruta' });
        } else {
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
          } else {
            data.days = values.days;
            data.date_start = values.dateStart;
            data.date_end = values.dateEnd;
          }

          if (otherRoutes.length > 0 && checkOtherRoutes) {
            data.other_routes = [];
            otherRoutes.map((item, index) => {
              data.other_routes.push({
                lat: item.route.lat,
                lng: item.route.lng,
              })
            })
          }

          if (isEdit) {
            setAlert({ type: 'info', active: true, message: 'Actualizando...' });
            updateSchedule(dataEdit.id, data).then((response) => {
              setAlert({ type: 'success', active: true, message: 'Actualizado correctamente' });
              pullData();
              handleCancel();
            }).catch((error) => {
              setAlert({ type: 'danger', active: true, message: 'Error al actualizar' });
            });
            // console.log("Caso de edición");
          } else {
            storeSchedule(data).then((response) => {
              setAlert({ type: 'success', active: true, message: 'Se ha registrado correctamente' });
              pullData();
              handleDelete('all');

              // Eliminar values de formik
              form.current.resetForm();
            })
              .catch((error) => {
                setAlert({ type: 'danger', active: true, message: 'Ha ocurrido un error' });
              })
          }


        }

      }
    }

    // alert(JSON.stringify(values));
  }
  return (
    <Formik
      // validationSchema={schema}
      // Para resetear el form
      innerRef={form}
      onSubmit={handleSubmit}
      initialValues={{
        origin: (Datico != null) ? Datico.origin : '',
        destination: '',
        typeRecord: '1',
        time: '',
        date: '',
        dateStart: '',
        dateEnd: '',
        days: [],
      }}
    >
      {({
        handleSubmit,
        values,
        touched,
        errors,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="origin">
                <Form.Label>Origen</Form.Label>
                <Field as={Form.Control} type="text" name="origin" 
                isInvalid={values.origin=='' && touched.origin} />
                <Form.Control.Feedback type="invalid">
                  Campo obligatorio
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="destination">
                <Form.Label>Destino</Form.Label>
                <Field as={Form.Control} type="text" name="destination" 
                  isInvalid={values.destination == '' && touched.destination} />
                <Form.Control.Feedback type="invalid">
                  Campo obligatorio
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
                  isInvalid={values.typeRecord == '1' && (values.date == '' || values.date == null) && touched.date}
                  disabled={values.typeRecord == '2'}
                />
                <Form.Control.Feedback type="invalid">
                  Ingrese una fecha valida
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className='mt-3'>
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
                  isInvalid={values.time == '' && touched.time}
                />
                <Form.Control.Feedback type="invalid">
                  Ingrese un horario valido
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className='mt-3 mb-4'>
            <Col>
              <Form.Group>
                <Form.Label>Fecha de inicio</Form.Label>
                <Field as={Form.Control} type="date" name="dateStart"
                  isInvalid={values.dateStart == '' && touched.dateStart}
                  disabled={values.typeRecord == '1'}
                />
                <Form.Control.Feedback type="invalid">
                  Ingrese una fecha valida
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Fecha de fin</Form.Label>
                <Field as={Form.Control} type="date" name="dateEnd"
                  isInvalid={values.dateEnd == '' && touched.dateEnd}
                  disabled={values.typeRecord == '1'}
                />
                <Form.Control.Feedback type="invalid">
                  Ingrese una fecha valida
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Button className='' type="submit">{isEdit ? 'Editar' : 'Agregar'}</Button>

          {isEdit && <Button className='ml-2' variant='danger' onClick={handleCancel}>Cancelar</Button>}
        
          {alert.active && <Alert className='mt-4' variant={alert.type}>{alert.message}</Alert>}
        </Form>
      )}
    </Formik>


  )
}

export default FormAdd