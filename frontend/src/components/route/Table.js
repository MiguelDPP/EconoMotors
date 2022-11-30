import React from 'react';
import { Button, Form } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import styles from '@styles/Map.module.css';

const Table = ({ locateInitial, locateFinal, handleDelete, checkOtherRoutes, setCheckOtherRoutes, otherRoutes, distance }) => {

  let data = [];

  const handle = (id) => {
    if (id === 1) {
      handleDelete('locateInitial');
    }else if (id === data.length) {
      handleDelete('locateFinal');
    }else {
      handleDelete('otherRoute', id - 2);
    }
  }
  

  if (locateInitial) {
    data[0] = {
      id: 1,
      'Descripción': 'Primera ruta',
      // Disminuir los decimales
      'Latitud': locateInitial.lat.toFixed(6),
      'Logitud': locateInitial.lng.toFixed(6),
      // Botones
      'Acciones': ''
    }
  }

  if (checkOtherRoutes) {
    otherRoutes.map((item, index) => {
      data[index + 1] = {
        id: index + 2,
        'Descripción': `Alterna ${index + 1}`,
        'Latitud': item.route.lat.toFixed(6),
        'Logitud': item.route.lng.toFixed(6),
        'Acciones': ''
      }
    })
  }

  if (locateFinal) {
    data[data.length] = {
      id: data.length + 1,
      'Descripción': 'Segunda ruta',
      // Disminuir los decimales
      'Latitud': locateFinal.lat.toFixed(6),
      'Logitud': locateFinal.lng.toFixed(6),
      // Botones
      'Acciones': ''
    }
  }

  const columns = [
    {
      name: 'id', 
      selector: 'id',
      sortable: false,
      grow: 1
    },
    {
      name: 'Descripción',
      selector: 'Descripción',
      sortable: false,
      grow: 2
    },
    {
      name: 'Latitud',
      selector: 'Latitud',
      sortable: false,
    },
    {
      name: 'Logitud',
      selector: 'Logitud',
      sortable: false,
    },
    {
      name: 'Acciones',
      selector: 'Acciones',
      sortable: false,
      grow: 1,
      cell: row => <Button variant="danger" onClick={() => handle(row.id)}><i className="fas fa-trash"/></Button>
    }
  ];

  // Configurar opcion de no data
  const customStyles = {
    rows: {
      style: {
        minHeight: '72px', // override the row height
      }
    },
    headCells: {
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
      },
    },
    cells: {
      style: {
        fontSize: '14px',
      },
    },
  };

  // return (
  //   <DataTable

  //     columns={columns}
  //     data={data}
  //     customStyles={customStyles}
  //     noDataComponent="No hay datos"
  //     pagination
  //     paginationPerPage={5}
  //     paginationRowsPerPageOptions={[5, 10, 15, 20]}
  //     paginationComponentOptions={{
  //       rowsPerPageText: 'Filas por página:',
  //       rangeSeparatorText: 'de',
  //       noRowsPerPage: false,
  //       selectAllRowsItem: true,
  //       selectAllRowsItemText: 'Todos',
  //     }}
  //   />

  const paginacionOpciones = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };



  return (
    <>
      <div className='d-flex justify-content-between'>
        <Form.Check className={`mb-2`}
          checked={checkOtherRoutes}
          onChange={(e) => {
            setCheckOtherRoutes(e.target.checked);
          }}
          disabled={locateFinal? false: true}
          type="switch"
          label="Seleccionar ruta personalizada"
          id="disabled-custom-switch"
        />

        <p className={`mb-2`}><span className='badge bg-primary mr-2'>Distancia:</span>{distance} m</p>

      </div>
      <DataTable className={`${styles.scroll} table-responsive`}
        style={{overflowX: 'scroll'}}
        title="Rutas"
        columns={columns}
        data={data}
        pagination
        paginationComponentOptions={paginacionOpciones}
        fixedHeader
        noDataComponent="No hay datos"
        customStyles={customStyles}
      />
    </>
  )
}

export default Table