import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const MapSearchBar: React.SFC = () => {

  // const greeting: string = useSelector( (state: AppState) => state.greeting )
  // const dispatch = useDispatch()
   

  return (
    <section className="searchBar">
      <form>
        <div className="searchInputContainer">
        <input className="searchInput" placeholder={"3131 W Bellfort Ave, Houston, TX"}/>
        <input className="searchSubmit" type="submit" value=""/>
        </div>
        <select className="searchCatagorySelect customDropdownArrow">
          <option>Mineral Rights</option>
        </select>
      </form>
    </section>
  )
}

export default MapSearchBar