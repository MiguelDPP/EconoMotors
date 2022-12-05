import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import TarjetChange from './TarjetChange';
import TarjetRoute from './TarjetRoute';




const ModalI = ({ show, setShow, dataEvent, setAllSchedule }) => {

  const handleClose = () => setShow(false);
  return (
    <Modal show={show} onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Informacion del Evento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {dataEvent.type == 'schedule' && <TarjetRoute setAllSchedule={setAllSchedule} setShow={setShow} dataEvent={dataEvent} />}
        {dataEvent.type != 'schedule' && <TarjetChange dataEvent={dataEvent} />}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalI