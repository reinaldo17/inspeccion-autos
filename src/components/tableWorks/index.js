import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import './styles.scss';
import ReactPaginate from 'react-paginate';
import EyeIcon from '../../assets/view.png';
import AddIcon from '../../assets/add.png';

export default function TableWorks(props) {
  const { handleShow2, notSearch, data } = props;
  const itemsPerPage = 4;
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');
  const [filterServices, setFilterServices] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [services, setServices] = useState([]);

  useEffect(() => {
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

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filterServices.length;
    setItemOffset(newOffset);
  };

  const changeTextSearch = (searchActive) => {
    setItemOffset(0);
    const result = services.filter(
      (word) =>
        word.fecha?.toLowerCase()?.includes(searchActive.toLowerCase()) ||
        word.descripcion?.toLowerCase()?.includes(searchActive.toLowerCase())
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
    <div className="table-container">
      {!notSearch && (
        <div
          style={{ position: 'relative', width: '170px', marginLeft: 'auto' }}
        >
          <TextField
            sx={{
              '& .MuiFormLabel-root': {
                fontSize: '0.8rem',
              },
            }}
            className="container-search-input"
            id="search"
            color={'error'}
            variant="standard"
            name="search"
            value={search}
            label="Buscar"
            onChange={(event) => setSearch(event.target.value)}
          />
          <img
            onClick={() => handleShow2()}
            src={AddIcon}
            style={{
              position: 'absolute',
              top: '20px',
              right: '135px',
            }}
          />
        </div>
      )}
      <div>
        <div className="header-table">
          <div className="header-item">Nombre</div>
          <div className="header-item">Placa</div>
        </div>
      </div>
      {currentItems?.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => handlerSelectService(item.id)}
            className="item-mailbox"
          >
            <div className="info-item" style={{ textTransform: 'capitalize' }}>
              {item.nombre}
            </div>
            <div className="info-item" style={{ textTransform: 'uppercase' }}>
              {item.placa}
            </div>
            <img
              onClick={() => handleShow2(item)}
              src={EyeIcon}
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
