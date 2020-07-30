import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

//This component is the search form section, left of the map.
const SearchBar: React.SFC = () => {

  //searchString is string currently displayed in the input
  const searchString: string = useSelector( (state: AppState) => state.searchInputString )
  const dispatch: Function = useDispatch()
  
  //value of search input is managed by store
  const updateSearchField = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch({type:"UPDATE_SEARCH",value:e.currentTarget.value})
  }

  const submitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    dispatch({type:"SUBMIT_SEARCH"})
  }

  //backgroundImage defined in js instead of css for build-step relative pathing
  const bckImg = {backgroundImage: "url('assets/icons/search-icon.svg')"}

  return (
    <section className="search-bar">
      <form onSubmit={submitForm}>
        <div className="search-input-container">
        <input className="search-input" value={searchString} onChange={updateSearchField}/>
        <input className="search-submit" type="submit" value="" style={bckImg}/>
        </div>
        <select className="search-catagory-select custom-dropdown-arrow">
          <option>Mineral Rights</option>
        </select>
      </form>
    </section>
  )
}

export default SearchBar