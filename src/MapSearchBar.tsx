import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const MapSearchBar: React.SFC = () => {

  // const greeting: string = useSelector( (state: AppState) => state.greeting )
  // const dispatch = useDispatch()
   

  return (
    <section className="searchBar">
      <input className="searchInput" />
      <select className="searchCatagorySelect">
        <option>Mineral Rights</option>
      </select>
    </section>
  )
}

export default MapSearchBar