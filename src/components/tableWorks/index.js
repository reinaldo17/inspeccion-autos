import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import './styles.scss';
import ReactPaginate from 'react-paginate';
import DeleteIcon from '../../assets/delete.png';
import AddIcon from '../../assets/add.png';

export default function TableWorks(props) {
  const { handleShow2, handleShow, data, inspectionSelected, onSubmit } = props;
  const itemsPerPage = 20;
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');
  const [filterServices, setFilterServices] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [services, setServices] = useState([]);

  useEffect(() => {
    console.log(data);
    setServices(data);
    setFilterServices(data);
  }, [data]);

  useEffect(() => {
    if (search.length != 0) {
      const timeOutId = setTimeout(() => changeTextSearch(search), 600);
      return () => clearTimeout(timeOutId);
    } else {
      setFilterServices(data);
    }
  }, [search]);

  const handlerSelectService = (idWorkflow) => {};

  const handleDeleteItem = (index) => {
    if (window.confirm('¿Estás seguro que desea Eliminar este Trabajo?')) {
      const inspection = inspectionSelected;
      let miArreglo = data;
      let posicionAEliminar = index;
      miArreglo.splice(posicionAEliminar, 1);
      inspection.trabajos = miArreglo;
      console.log(inspection);
      onSubmit(inspection);
    }
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filterServices.length;
    setItemOffset(newOffset);
  };

  const changeTextSearch = (searchActive) => {
    setItemOffset(0);
    const result = services.filter(
      (word) =>
        word.descripcionTaller
          ?.toLowerCase()
          ?.includes(searchActive.toLowerCase()) ||
        word.descripcionProvider
          ?.toLowerCase()
          ?.includes(searchActive.toLowerCase())
    );

    setFilterServices(result);
  };
  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filterServices?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filterServices?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filterServices]);

  // Invoke when user click to request another page.

  return (
    <div className="table-container" style={{ marginTop: '20px' }}>
      <div
        style={{
          position: 'relative',
          width: '170px',
          marginLeft: 'auto',
        }}
      >
        <img
          onClick={() => handleShow2()}
          src={AddIcon}
          style={{
            marginLeft: 'auto',
            display: 'block',
            marginRight: '5px',
          }}
        />
      </div>

      <div>
        <div className="header-table">
          <div className="header-item">Trabajos</div>
        </div>
      </div>
      {currentItems?.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => handlerSelectService(item.id)}
            className="item-mailbox2"
          >
            <div>
              {item.fecha && (
                <div
                  className="info-item"
                  style={{ textTransform: 'capitalize' }}
                >
                  ·Fecha: {item.fecha}
                </div>
              )}
              {item.descriptionTaller && (
                <div
                  className="info-item"
                  style={{ textTransform: 'capitalize' }}
                >
                  ·Trabajo Realizado en Taller: {item.descriptionTaller}
                </div>
              )}
              {item.descriptionExtern && (
                <div className="info-item">
                  ·Trabajo Proveedor Externo: {item.descriptionExtern}
                </div>
              )}
            </div>
            <img
              onClick={() => handleDeleteItem(index)}
              src={DeleteIcon}
              style={{
                width: '18px',
                height: '18px',
                margin: 'auto',
                marginRight: 0,
              }}
            />
          </div>
        );
      })}
      {currentItems?.length === 0 && (
        <div className="container-empty">No se encontraron resultados</div>
      )}
      <ReactPaginate
        breakLabel="..."
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        activeClassName="active"
        previousLabel="<"
        nextLabel=">"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        marginPagesDisplayed={1}
      />
    </div>
  );
}
