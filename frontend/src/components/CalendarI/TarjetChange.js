import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'

const TarjetChange = ({dataEvent}) => {
  let icon = '';
  if (dataEvent.type == 'changeGasoline' || dataEvent.type == 'gasoline') {
    icon = 'fa-gas-pump';
  } else {
    icon = 'fa-oil-can';
  }

  return (
    <Row>
      <Col xs={12}>
        <div className="d-flex justify-content-between">
        <h5 className='text-center badge badge-info' style={{fontSize: 20}}>
          <i className={`fas ${icon} mr-2`} />
          {dataEvent.title}</h5> 
        </div>
        <Row className='mt-3'>
          <Col>
            <p><strong>Fecha:</strong> {dataEvent.date}</p>
          </Col>
          <Col>
            <p><strong>Kilometraje:</strong> {dataEvent.km.toFixed(2)} km</p>
          </Col>
        </Row>

          {dataEvent.type == 'oil' && (
            <Row>
              <Col>
                <p><strong>Valor pagado: $</strong> {dataEvent.price}</p>
              </Col>
            </Row>
          )}
        
          {dataEvent.type == 'gasoline' && (
            <>
            <Row>
              <Col>
                <p><strong>Valor pagado: $</strong>{dataEvent.price}</p>
              </Col>
              <Col>
                <p><strong>Valor galon: $</strong>{dataEvent.priceXgalon}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p><strong>Galones: </strong>{dataEvent.galons.toFixed(2)}</p>
              </Col>
            </Row>
            </>
          )}
        
      
      </Col>
    </Row>
  )
}
export default TarjetChange