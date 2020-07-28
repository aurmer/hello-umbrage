import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const MapSearchBar: React.SFC = () => {

  // const greeting: string = useSelector( (state: AppState) => state.greeting )
  // const dispatch = useDispatch()
   

  return (
    <section className="search-bar">
      <form>
        <div className="search-input-container">
        <input className="search-input"/>
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