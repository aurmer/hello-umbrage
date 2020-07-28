import React, { useEffect } from 'react'
import L from 'leaflet'
let myMap
const MapEmbed: React.SFC = () => {

  // const greeting: string = useSelector( (state: AppState) => state.greeting )
  // const dispatch = useDispatch()

  useEffect(()=>{
    myMap = L.map('map',{zoomSnap: 0}).setView([37.090240,-95.712891], 4.6)
    const Stamen_Terrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}',
                                        {attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                                        subdomains: 'abcd',
                                        minZoom: 0,
                                        maxZoom: 18,
                                        // @ts-ignore - this isn't in the typing, but is required
                                        ext: 'png'});
    Stamen_Terrain.addTo(myMap)
  },[])
   

  return (
    <figure className="map-embed">
      <div id="map"/>
    </figure>
  )
}

export default MapEmbed