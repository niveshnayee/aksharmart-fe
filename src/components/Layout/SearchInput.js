import React from 'react'
import { useSearch } from '../../Context/SearchContext'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const SearchInput = () => {
    
    const [value, setValue] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        navigate(`/search?query=${encodeURIComponent(value)}`);
    }
   

    return (
    <>
        <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input 
                className="form-control me-2" 
                type="search" 
                placeholder="Search" 
                aria-label="Search" 
                value={value}
                onChange={(e) => setValue(e.target.value)}/>

            <button 
                className="btn btn-outline-success" 
                type="submit">
                    Search</button>
        </form>

    </>
  )
}

export default SearchInput
