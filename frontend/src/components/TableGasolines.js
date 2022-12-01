import React from 'react';
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

const TableGasolines = ({ Gasolines }) => {
  const columns = [
    {
      name: 'id', 
      selector: 'id',
      sortable: false,
    },
    {
      name: 'Fecha de Registro',
      selector: 'Fecha',
      sortable: false,
    },
    {
      name: 'Estacion o Bomba',
      selector: 'Estacion',
      sortable: false,
    },
    {
      name: 'Precio',
      selector: 'Precio',
      sortable: false,
    },
    {
      name: 'Acciones',
      selector: 'Acciones',
      sortable: false,
      cell: row => <Button variant="danger" onClick={() => handleDelete(row.id)}>Eliminar</Button>
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
      title="Rutas"
      columns={columns}
      data={Gasolines}
      pagination
      paginationComponentOptions={paginacionOpciones}
      fixedHeader
    />
  )
}

export default TableGasolines