import React from 'react';
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

const TableGasolines = ({ Gasolines }) => {
  const columns = [
    {
      name: 'Id', 
      selector: 'Id',
      sortable: false,
    },
    {
      name: 'Fecha',
      selector: 'Fecha',
      sortable: false,
    },
    {
      name: 'Estacion',
      selector: 'Estacion',
      sortable: false,
    },
    {
      name: 'PrecioXgalon',
      selector: 'PrecioXgalon',
      sortable: false,
    },
    {
      name: 'Precio',
      selector: 'Precio',
      sortable: false,
    }
  ];

  const paginacionOpciones = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };

  return (
    <DataTable 
      title="Registro de Gasolinas"
      columns={columns}
      data={Gasolines}
      pagination
      paginationComponentOptions={paginacionOpciones}
      fixedHeader
    />
  )
}

export default TableGasolines