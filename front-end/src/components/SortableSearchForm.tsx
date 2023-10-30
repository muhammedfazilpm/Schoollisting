import React from 'react';

function SortableSearchForm() {
  return (
    <form className="form-inline">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      <div className="btn-group ml-2">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Sort
        </button>
        <div className="dropdown-menu">
          <button className="dropdown-item" type="button">
            High to Low
          </button>
          <button className="dropdown-item" type="button">
            Low to High
          </button>
        </div>
      </div>
    </form>
  );
}

export default SortableSearchForm;
