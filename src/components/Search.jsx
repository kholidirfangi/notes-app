import React from 'react';

function Search({ onChange }) {
  return (
    <input
      type="text"
      placeholder="Cari Catatan.."
      className="search"
      onChange={onChange}
    />
  );
}

export default Search;
