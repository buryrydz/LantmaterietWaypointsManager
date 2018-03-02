import React from 'react';

const SearchBar = () => {
    function onInputChange(event) {
        // const val = event.target.value.toLowerCase();
        console.log("dziala: "+event.target.value)
    }

    return (
        <div className="input-group">
            <input onKeyUp={onInputChange} type="text" className="form-control" placeholder="Search.."></input>
            <div className="input-group-append">
                <label className="btn btn-secondary" type="button"><i className="fa fa-search" aria-hidden="true"></i></label>
            </div>
        </div>
    )
}

export default SearchBar;