import React, { useEffect, useState } from 'react';
import Calendar from 'components/CalendarI';
import { Alert, Card, Col, Row } from 'react-bootstrap';
import Schedule from '@services/api/Schedule';
import Modal from 'components/CalendarI/Modal';
import { useAlert } from '@hooks/useAlert';

const schedule = () => {
  const { alert } = useAlert();
  const [allSchedule, setAllSchedule] = useState([]);
  const [exceptionSchedule, setExceptionSchedule] = useState([]);
  const { getFullCalendar } = Schedule();
  const [show, setShow] = useState(false);
  const [dataEvent, setDataEvent] = useState({});

  useEffect(() => {
    getFullCalendar().then((response) => {
      setAllSchedule(response.data);
      setExceptionSchedule(response.exceptions.date_exepcion);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <>
    { alert.active && alert.type == 'success' && <Alert type={alert.type} className='mb-3'>alert.message</Alert> }

    <Row>
      <Col xs={12}>
        <Card>
          <Card.Header>
            <Card.Title as="h5">Calendario</Card.Title>
          </Card.Header>
          <Card.Body>
            <Calendar exceptionSchedule={exceptionSchedule} show={show} setShow={setShow} allSchedule={allSchedule} setDataEvent={setDataEvent}/>
          </Card.Body>
        </Card>
      </Col>
      <Modal show={show} setShow={setShow} dataEvent={dataEvent} setAllSchedule={setAllSchedule}/>
    </Row>
    </>
  )
}

export default schedule