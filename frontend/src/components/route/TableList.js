import React from 'react';
import { Button, Form } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import styles from '@styles/Map.module.css';
import Schedule from '@services/api/Schedule';
import { useAlert } from '@hooks/useAlert';

const TableList = ({allSchedule, setIsEdit, setDataEdit, setOtherRoutes}) => {
  const { showSchedule, deleteSchedule } = Schedule();
  const { setAlert } = useAlert();
  const data = [];

  const handleEdit = (id) => {
    showSchedule(id).then((response) => {
      setOtherRoutes([]);

      setDataEdit(response.data);
      setIsEdit(true);
    })
    .catch((error) => {
      setAlert({
        type: 'error',
        active: true,
        message: "No se ha encontrado el registro",
      });
    });

  }

  const handleDelete = (id) => {
    deleteSchedule(id).then((response) => {
      setAlert({
        type: 'success',
        active: true,
        message: "Se ha eliminado el registro",
      });
      setIsEdit(false);
      setDataEdit(null);
    })
    .catch((error) => {
      setAlert({
        type: 'error',
        active: true,
        message: "No se ha eliminado el registro",
      });
    });
  }

  {allSchedule !== null && allSchedule.map((item, index) => {
    data[index] = {
      id: item.id,
      '#': index + 1,
      'origin': item.origin,
      'destination': item.destination,
      'distance': item.distance + ' m',
      'date_start': (item.date_start !== null) ? item.date_start : item.date,
      'date_end': (item.date_end !== null) ? item.date_end : item.date,
      'actions': ''
    }
  })}
      


  const columns = [
    // Id oculto  
    // {
    //   name: 'id',
    //   selector: 'id',
    //   sortable: false,
    //   // Ocultar columna
    //   hide: true,
    // },
    {
      name: '#',
      selector: '#',
      sortable: true,
    },
    {
      name: 'Lugar de inicio',
      selector: 'origin',
      sortable: true,
    },
    {
      name: 'Lugar de destino',
      selector: 'destination',
      sortable: true,
    },
    {
      name: 'Distancia',
      selector: 'distance',
      sortable: true,
    },
    {
      name: 'Fecha de inicio',
      selector: 'date_start',
      sortable: true,
      grow: 2,
    },
    {
      name: 'Fecha de fin',
      selector: 'date_end',
      sortable: true,
      grow: 2,
    },
    {
      name: 'Acciones',
      selector: 'actions',
      sortable: false,
      cell: (row) => (
        <div className={styles.actions}>
          <Button variant="primary"
            className='mr-2'
            onClick={() => handleEdit(row.id)}
          ><i className="fas fa-pen" /></Button>
          <Button variant="danger" onClick={()=> handleDelete(row.id)}><i className="fas fa-trash" /></Button>
        </div>
      ),
      grow: 2,
    },
  ];

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

  const paginacionOpciones = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };

  
  const [filterText, setFilterText] = React.useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
	const filteredItems = data.filter(
		item => item.origin && item.origin.toLowerCase().includes(filterText.toLowerCase()),
	);


  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText('');
    }
  };
  // const subHeaderComponentMemo = React.useMemo(() => {
		

	// 	return (
  //     <Form.Control className='mt-4' type='text' placeholder='Buscar' value={filterText} onChange={e => setFilterText(e.target.value)} />
	// 		// <Filter onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
	// 	);
	// }, [filterText, resetPaginationToggle]);
  
  
  return (
    <>
    <Form.Control className='mt-4 mb-3' style={{maxWidth: 300, marginLeft: 'auto'}} type='text' placeholder='Buscar' value={filterText} onChange={e => setFilterText(e.target.value)} />
    <DataTable className={`${styles.scroll} table-responsive`}
        style={{overflowX: 'scroll'}}
        // title="Todas las rutas"
        columns={columns}
        data={filteredItems}
        pagination
        paginationComponentOptions={paginacionOpciones}
        fixedHeader
        noDataComponent="No hay datos"
        customStyles={customStyles}
        // Para buscar

        // Filter
        // subHeaderComponent={subHeaderComponentMemo}
      />
    </>
  )
}

export default TableList