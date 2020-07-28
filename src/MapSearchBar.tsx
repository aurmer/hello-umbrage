import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const MapSearchBar: React.SFC = () => {

  const searchString: string = useSelector( (state: AppState) => state.searchInputString )
  const dispatch = useDispatch()
   
  const updateSearchField = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({type:"UPDATE_SEARCH",value:e.currentTarget.value})
  }

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({type:"SUBMIT_SEARCH"})
  }

  return (
    <section className="search-bar">
      <form onSubmit={submitForm}>
        <div className="search-input-container">
        <input className="search-input" value={searchString} onChange={updateSearchField}/>
        <input className="search-submit" type="submit" value=""/>
        </div>
        <select className="search-catagory-select custom-dropdown-arrow">
          <option>Mineral Rights</option>
        </select>
      </form>
    </section>
  )
}

export default MapSearchBar