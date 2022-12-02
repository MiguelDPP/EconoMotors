import React, { useEffect, useState } from 'react'
import Map from 'components/route/Map';
import icon2 from 'leaflet/dist/images/marker-icon.png';
import { Alert, Button, Col, Modal, Row } from 'react-bootstrap';
import Schedule from '@services/api/Schedule';
import { useAlert } from '@hooks/useAlert';


const TarjetRoute = ({dataEvent, setShow, setAllSchedule}) => {
  const { alert, setAlert } = useAlert();
  const { storeScheduleException, getFullCalendar, removeScheduleException } = Schedule();

  const [locateInitial, setLocateInitial] = useState(null);
  const [locateFinal, setLocateFinal] = useState(null);
  const [routes, setRoutes] = useState(null);
  const [distance, setDistance] = useState(0);
  const [otherRoutes, setOtherRoutes] = useState([]);
  const [checkOtherRoutes, setCheckOtherRoutes] = useState(false);

  const compareDateToText = (date) => {
    console.log(dataEvent);
    const dateText = new Date(date);
    const dateNow = new Date();
    if (dataEvent.isException) {
      return 'Cancelar Excepcion';
    }
    if (dateText > dateNow) {
      
      return 'No ire este día';
    }
    return 'No fui este día';
  }

  const handleException = () => {
    let data = {
      schedule_id: dataEvent.data.id,
      date: dataEvent.date,
    }
    if (dataEvent.isException) {
      removeScheduleException(dataEvent.id).then((response) => {
        setAlert({ active: true, type: 'success', message: 'Se ha cancelado la excepción' });
        setShow(false);
        getFullCalendar().then((response) => {
          setAllSchedule(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      })
      .catch((error) => {
        setAlert({ active: true, type: 'danger', message: 'Ha ocurrido un error' });
      });
    }else {
      storeScheduleException(data).then((response) => {
        setAlert({ active: true, type: 'success', message: 'Se ha guardado la excepción' });
        setShow(false);
        getFullCalendar().then((response) => {
          setAllSchedule(response.data);
        })
        .catch((error) => {
          
        });
      })
      .catch((error) => {
        setAlert({ active: true, type: 'danger', message: 'Ha ocurrido un error' });
      });
    }
  }

  useEffect(() => {
    if (dataEvent.type == 'schedule') {
      setLocateInitial({
        'lat': dataEvent.data.lat_origin,
        'lng': dataEvent.data.lng_origin,
      });
      setLocateFinal({
        'lat': dataEvent.data.lat_destination,
        'lng': dataEvent.data.lng_destination,
      });

      if (dataEvent.data.other_routes !== null && dataEvent.data.other_routes !== undefined && dataEvent.data.other_routes !== '') {
        let Oroutes = [];
        
        dataEvent.data.other_routes.map((item, index) => {
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
    }
  }, [dataEvent]);

  return (
    <>
      <Row>
          <Col xs={12}>
            <div className="d-flex justify-content-between">
            <h5 className='text-center badge badge-info' style={{fontSize: 20}}>{dataEvent.title}</h5> 
            <Button variant="danger" onClick={handleException}>{compareDateToText(dataEvent.date)}</Button>
            </div>
            <Row className='mt-3'>
              <Col>
                <p><strong>Inicio:</strong> {dataEvent.data.origin}</p>
              </Col>
              <Col>
                <p><strong>Fin:</strong> {dataEvent.data.destination}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p><strong>Distancia: </strong>{dataEvent.data.distance} m</p>
              </Col>
              <Col>
                <p><strong>Fecha: </strong>{dataEvent.date}</p>
              </Col>
            </Row>
          
          </Col>
        </Row>
        { alert.active && alert.type == 'danger' && <Alert variant="danger">{alert.message}</Alert> }
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
                  <Tooltip>
                    Lugar de llegada
                  </Tooltip>
                </Marker>}

                {routes && <Polyline positions={routes} />}
              </>
            )}

          </Map>
    </>
  )
}

export default TarjetRoute