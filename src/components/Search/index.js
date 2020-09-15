import React, { useState } from 'react';
import './search.scss';

export default function Search({ onSearch }) {
  const [searchText, setSearchText] = useState('');
  return (
    <div className="search-component jumbotron">
      <form className="container-fluid form-inline mt-2 mt-md-0" onSubmit={handleSearch}>
        <input
          className="form-control mr-sm-2"
          name="search"
          value={searchText}
          onChange={handleSearchChange}
          type="text"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    </div>
  );

  function handleSearchChange(e) {
    setSearchText(e.target.value);
  }

  function handleSearch(e) {
    e.preventDefault();
    onSearch(searchText);
  }
}
