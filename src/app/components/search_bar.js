import React from 'react';

const SearchBar = (props) => {
    return (
        <div className="input-group">
            <input onKeyUp={(event) => props.onSearchTermChanged(event.target.value)} type="text" className="form-control" placeholder="Search.."></input>
            <div className="input-group-append">
                <label className="btn btn-secondary" type="button"><i className="fa fa-search" aria-hidden="true"></i></label>
            </div>
        </div>
    )
}

export default SearchBar;