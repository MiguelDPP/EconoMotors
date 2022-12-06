import React from 'react';
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import Tools from '@services/api/Tools';
import { useAlert } from '@hooks/useAlert';

const TableGasolines = ({ Gasolines, setChangeDelete }) => {

  const {deleteGasoline} = Tools();
  const { alert, setAlert, toggleAlert } = useAlert();

  const handleDelete = (id) =>{
    console.log("Eliminando este " + id);
    deleteGasoline(id).then((response) =>{
      console.log(response);
      setAlert({
        active: true,
        message: 'Eliminado Correctamente',
        type: 'success',
      });
      setChangeDelete(true);
    }).catch((error) =>{
      setAlert({
        active: false,
        message: 'Problemas al eliminar.',
        type: 'danger',
      });
    });
  }

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
    },
    {
      name: 'Acciones',
      selector: 'Acciones',
      sortable: false,
      cell: row =>  <Button variant="danger" onClick={() => handleDelete(row.Id)}><i class="fas fa-trash-alt"></i></Button> 
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