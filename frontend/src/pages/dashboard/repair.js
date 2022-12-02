import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'

const repair = () => {
  return (
    <>
      <Row>
        <Col xs={12}>
          <Card>
            <Card.Header>
              <Card.Title className='mt-2' as="h5">Repair</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                This is the repair page
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className='mt-4'>
        <Col xs={4}>
          <Card>
            <Card.Body>
              <Card.Title>Repair</Card.Title>
              <Card.Text>
                This is the repair page
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={8}>
          <Card>
            <Card.Body>
              <Card.Title>Repair</Card.Title>
              <Card.Text>
                This is the repair page
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default repair