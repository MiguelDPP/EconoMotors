import React, { useEffect, useRef, useState } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap';
import Statistic from '@services/api/Statistic';
import { useAuth } from '@hooks/useAuth';
import MainChart from 'components/Charts/MainChart';
import axios from 'axios';

const index = () => {
  const { getNecessaryGasolineGlobal, getDataAge, getCostByYear, getCostByYearGasoline } = Statistic();
  const { informationGlobal, setInformationGlobal } = useAuth();
  const [dataInitial, setDataInitial] = useState({});
  const [dataFinal, setDataFinal] = useState({});
  const [dataCost, setDataCost] = useState(null);
  const [dataGas, setDataGas] = useState(null);
  const [months, setMonths] = useState([]);
  const [month, setMonth] = useState(0); //Todavia no se para que
  const [costTotal, setCostTotal] = useState(0);
  const [dataMonth, setDataMonth] = useState({});

  const handleSetDataMonth = (month) => {
    let data = 0;
    if (dataCost != null) {
      if (month == 1) {
        data = dataCost.datasets[0].data.Enero;
      } else if (month == 2) {
        data = dataCost.datasets[0].data.Febrero;
      } else if (month == 3) {
        data = dataCost.datasets[0].data.Marzo;
      } else if (month == 4) {
        data = dataCost.datasets[0].data.Abril;
      } else if (month == 5) {
        data = dataCost.datasets[0].data.Mayo;
      } else if (month == 6) {
        data = dataCost.datasets[0].data.Junio;
      } else if (month == 7) {
        data = dataCost.datasets[0].data.Julio;
      } else if (month == 8) {
        data = dataCost.datasets[0].data.Agosto;
      } else if (month == 9) {
        data = dataCost.datasets[0].data.Septiembre;
      } else if (month == 10) {
        data = dataCost.datasets[0].data.Octubre;
      } else if (month == 11) {
        data = dataCost.datasets[0].data.Noviembre;
      } else if (month == 12) {
        data = dataCost.datasets[0].data.Diciembre;
      }
      setDataMonth({
        'dataCost': data
      });
    }
  }

  const getDataCost = (year) => {
    getCostByYear(year)
      .then((response) => {
        setDataCost(response.data);
        setCostTotal(response.costTotalGlobal);
        // handleSetDataMonth(dataInitial.month);
        // console.log(dataInitial);
      })
      .catch((error) => {
        // console.log(error);
      }
      );

    getCostByYearGasoline(year)
      .then((response) => {
        setDataGas(response.data);
      }
      )
      .catch((error) => {
        // console.log(error);
      } 
      );
  }

  useEffect(() => {
    handleSetDataMonth(month);
    console.log(dataMonth);
  }, [month, dataCost]);

  useEffect(() => {
    getDataAge()
      .then((response) => {
        setDataInitial({
          'year': response.yearIni,
          'month': response.monthIni,
        })
        setDataFinal({
          'year': response.yearEnd,
          'month': response.yearEnd,
        })

        setMonth(response.monthIni);

        getDataCost(response.yearIni);
      })
      .catch((error) => {
        // console.log(error);
      }
      );
  }, []);

  // const months = useRef(null);

  const calculateYears = () => {

    let components = <></>
    for (let i = dataInitial.year; i <= dataFinal.year; i++) {
      components = (
        <>
          {components}
          <option value={i}>{i}</option>
        </>
      )
    }
    // setMonth(dataInitial.month);
    calculateMonths(dataInitial.year);
    return components;
  }





  const returnMonth = (month) => {
    if (month == 1) {
      return 'Enero';
    }
    if (month == 2) {
      return 'Febrero';
    }
    if (month == 3) {
      return 'Marzo';
    }
    if (month == 4) {
      return 'Abril';
    }
    if (month == 5) {
      return 'Mayo';
    }
    if (month == 6) {
      return 'Junio';
    }
    if (month == 7) {
      return 'Julio';
    }
    if (month == 8) {
      return 'Agosto';
    }
    if (month == 9) {
      return 'Septiembre';
    }
    if (month == 10) {
      return 'Octubre';
    }
    if (month == 11) {
      return 'Noviembre';
    }
    if (month == 12) {
      return 'Diciembre';
    }
  }

  const calculateMonths = (year) => {

    let data = [];
    if (months.current != null) {
      if (year == dataInitial.year) {
        for (let i = dataInitial.month; i <= 12; i++) {
          data.push(i);
        }
      } else if (year == dataFinal.year) {
        for (let i = 1; i <= dataFinal.month; i++) {
          data.push(i);
        }
      } else {
        for (let i = 1; i <= 12; i++) {
          data.push(i);
        }
      }

      setMonths(data);
      console.log(data);
    }

  }

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
      </div>
      <Row className='d-flex justify-content-between'>
        <Col xs={6}>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Año</Form.Label>
                <Form.Select aria-label="Default select example"
                  onChange={(e) => { calculateMonths(e.target.value); getDataCost(e.target.value) }}
                >
                  {
                    calculateYears()
                  }
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Mes</Form.Label>
                <Form.Select aria-label="Default select example" ref={months}
                  onChange={(e) => { handleSetDataMonth(e.target.value) }}
                  
                >
                  {months.map((month) => (
                    <option value={month}>{returnMonth(month)}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Col>

        {/* Mostrar kilometraje */}
        <Col xs={3}>
          <div className="text-xs font-weight-bold text-primary text-uppercase mb-1 text-right">
            Kilometraje
          </div>
          <div className="h5 mb-0 font-weight-bold text-gray-800 text-right">{informationGlobal.mileage_today ? informationGlobal.mileage_today.toFixed(2) : 0} km</div>
        </Col>
      </Row>
      <div className="row mt-4">
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Dinero gastado (Mes)</div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">${dataMonth.dataCost ? dataMonth.dataCost : 0}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-calendar fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Dinero gastado (año)</div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">${costTotal}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-dollar-sign fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Proximo fecha para tanquear</div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{informationGlobal.hasToChange ? informationGlobal.date_tank : '-'}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-gas-pump fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Pending Requests Card Example */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Proximo cambio de aceite</div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{informationGlobal.date_change_oil ? informationGlobal.date_change_oil : '-'}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-oil-can fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Row>
        <Col xs={6}>
          <Card>
            <Card.Body>
              <Card.Title>Gastos de la moto</Card.Title>

              <MainChart data={dataCost} />
            </Card.Body>

          </Card>
        </Col>
        <Col xs={6}>
          <Card>
            <Card.Body>
              <Card.Title>Gastos de gasolina</Card.Title>
                <MainChart data={dataGas} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>


  )
}

export default index