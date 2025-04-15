import React from 'react'
import { FaSearch } from "react-icons/fa";



const Search = () => {
  return (
    <div>
      <div className='search'>
        <FaSearch className="search-icon" />
        <input type="search" placeholder='Enter City' />

      </div>
    </div>
  )
}

export default Search