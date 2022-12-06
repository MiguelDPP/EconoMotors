import React, { useEffect, useState } from 'react';
import { Button , Modal } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import Tools from '@services/api/Tools';
import { useAlert } from '@hooks/useAlert';


const TableOils = ({ Oils, changeDelete, setChangeDelete, numPeticion, setnumPeticion }) => {

  const { alert, setAlert, toggleAlert } = useAlert();
  const [show, setShow] = useState(false);
  const {deleteOil} = Tools();
  const [currentOil , setcurrentOil] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = (row) => {
    setcurrentOil(row);
    setShow(true);
  };


  const handleDelete = (id) =>{
    deleteOil(id).then((response) =>{
      console.log(response);
      setAlert({
        active: true,
        message: 'Eliminado Correctamente',
        type: 'success',
      });
      setChangeDelete(!changeDelete);
      setnumPeticion(!numPeticion);
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
      name: 'Descripción',
      selector: 'Descripcion',
      sortable: false,
      cell: row => <Button onClick={() => handleShow(row)} variant="outline-primary"><i class="fas fa-comment-dots"></i></Button>
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
      cell: row => <Button variant="danger" onClick={() => handleDelete(row.Id)}><i class="fas fa-trash-alt"></i></Button>
    }
  ];

  const paginacionOpciones = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };

  return (
    <div>
      <DataTable 
      title="Registro de Aceites"
      columns={columns}
      data={Oils}
      pagination
      paginationComponentOptions={paginacionOpciones}
      fixedHeader
    />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Compra de Aceite</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><b>Fecha de Compra : </b> {currentOil.Fecha} </p>
          <p><b>Descripción : </b> {currentOil.Descripcion} </p>
          <p><b>Precio : </b> {currentOil.Precio} </p>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </div>
    
  )
}

export default TableOils