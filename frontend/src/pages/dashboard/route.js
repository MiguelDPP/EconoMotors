import React, { useEffect, useState } from 'react';
import Table from 'components/route/Table';
import { Row, Col, Card, Button } from 'react-bootstrap';
import Map from 'components/route/Map';
import icon2 from 'leaflet/dist/images/marker-icon.png';
import icon from 'leaflet/dist/images/marker-icon.png';
import styles from '@styles/Map.module.css';
import FormAdd from 'components/route/FormAdd';
import Schedule from '@services/api/Schedule';
import TableList from 'components/route/TableList';

const route = () => {
  const [locateInitial, setLocateInitial] = useState(null);
  const [locateFinal, setLocateFinal] = useState(null);
  const [routes, setRoutes] = useState(null);
  const [distance, setDistance] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [allSchedule, setAllSchedule] = useState(null);
  const [dataEdit, setDataEdit] = useState(null);
  const { showSchedules } = Schedule();
  const [otherRoutes, setOtherRoutes] = useState([]);
  const [checkOtherRoutes, setCheckOtherRoutes] = useState(false);

  const pullData = () => {
    showSchedules().then((response) => {
      setAllSchedule(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    pullData();

    if (isEdit && dataEdit) {
      setLocateInitial({
        'lat': dataEdit.lat_origin,
        'lng': dataEdit.lng_origin,
      });
      setLocateFinal({
        'lat': dataEdit.lat_destination,
        'lng': dataEdit.lng_destination,
      });

      if (dataEdit.other_routes !== null && dataEdit.other_routes !== undefined && dataEdit.other_routes !== '') {
        let Oroutes = [];
        
        dataEdit.other_routes.map((item, index) => {
          Oroutes.push({
            id: index + 1,
            route: {
              'lat': item.lat,
              'lng': item.lng,
            }
          });
        });

        if (Oroutes.length > 0) {
          setCheckOtherRoutes(true);
          setOtherRoutes(Oroutes);
        }
      }
      // setOtherRoutes
      // setDistance(dataEdit.distance);
    }
  }, [
    isEdit, dataEdit
  ]);

  

  const handleDelete = (type, position = false) => {
    if (type === 'locateInitial' && locateFinal == null) {
      setLocateInitial(null);
      setLocateFinal(null);
      setRoutes(null);
    } else if (type === 'locateFinal' && otherRoutes.length === 0) {
      setLocateFinal(null);
      setRoutes(null);
      setCheckOtherRoutes(false);
      setDistance(0);
    } else if (type === 'otherRoute') {
      setOtherRoutes(otherRoutes.filter((item, index) => index !== position));
    }else if (type == 'all' ) {
      setOtherRoutes([]);
      setLocateFinal(null);
      setRoutes(null);
      setLocateInitial(null);
      setCheckOtherRoutes(false);
    }
  }



  return (
    <>
      <Row>
        <Col xs={5}>
          <Card>
            <Card.Body className={styles.scroll} style={{ height: '34rem', overflowY: 'scroll' }}>
              <Table locateInitial={locateInitial}
                locateFinal={locateFinal}
                handleDelete={handleDelete}
                checkOtherRoutes={checkOtherRoutes}
                setCheckOtherRoutes={setCheckOtherRoutes}
                otherRoutes={otherRoutes}
                distance={distance}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={7}>
          <Card>
            <Card.Body>
              <Card.Title>Seleccione la ruta</Card.Title>
              <Map zoom={15}
                setLocateInitial={setLocateInitial} setLocateFinal={setLocateFinal}
                locateInitial={locateInitial} locateFinal={locateFinal} setOtherRoutes={setOtherRoutes} otherRoutes={otherRoutes}
                checkOtherRoutes={checkOtherRoutes} setRoutes={setRoutes} setDistance={setDistance}
              >
                {({ TileLayer, Marker, Tooltip, Polyline }) => (
                  <>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    {/* <Marker position={DEFAULT_CENTER}>
                    <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                  </Marker> */}

                    {locateInitial && <Marker position={locateInitial}
                      icon={new L.Icon({
                        iconUrl: icon2.src,
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                      })}
                    >
                      <Tooltip direction="top" offset={[0, -10]} opacity={1} className="text-primary">
                        Lugar de partida
                      </Tooltip>
                    </Marker>}

                    {/* Market con icono */}
                    {/* <Marker position={DEFAULT_CENTER} icon={new L.Icon({
                    iconUrl: icon.src,
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                  })}>
                  </Marker> */}

                    {checkOtherRoutes && otherRoutes.map((route, index) => (
                      <Marker key={index} position={route.route}
                        icon={new L.Icon({
                          iconUrl: icon.src,
                          iconSize: [25, 41],
                          iconAnchor: [12, 41],
                          popupAnchor: [1, -34],
                        })}
                      >
                        <Tooltip direction="top" offset={[0, -10]} opacity={1} className="text-primary">
                          Ruta personalizada {index + 1}
                        </Tooltip>
                      </Marker>
                    ))}



                    {locateFinal && <Marker position={locateFinal}
                      icon={new L.Icon({
                        iconUrl: icon2.src,
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                      })}
                    >
                      {/* Evento clic */}
                      <Tooltip>
                        Lugar de llegada
                      </Tooltip>
                    </Marker>}

                    {routes && <Polyline positions={routes} />}
                  </>
                )}

              </Map>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className='mt-4 mb-4'>
        <Col xs={4}>
          <Card style={{ minHeight: '34rem'}}>
            <Card.Header>
              <Card.Title className='mt-2'>Informacion adicional</Card.Title>
            </Card.Header>
            <Card.Body className='pt-4'>
              {/* <p className='text-secondary'>Ingresa informacion de la ruta y los dias que se toma la misma</p> */}
              <FormAdd className='mt-5' distance={distance} locateInitial={locateInitial}
                locateFinal={locateFinal} otherRoutes={otherRoutes}
                handleDelete={handleDelete} pullData={pullData}
                isEdit={isEdit} setIsEdit={setIsEdit} dataEdit={dataEdit} setDataEdit={setDataEdit}
                checkOtherRoutes={checkOtherRoutes}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={8}>
          <Card>
            <Card.Body className={styles.scroll} style={{ height: '34rem', overflowY: 'scroll' }}>
              <Card.Title>Listado de Rutas</Card.Title>
              <TableList
              setOtherRoutes={setOtherRoutes}
              allSchedule={allSchedule} setIsEdit={setIsEdit} setDataEdit={setDataEdit} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default route