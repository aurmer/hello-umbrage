import React, { useEffect } from 'react'
import L, { LatLng, Zoom } from 'leaflet'
import { useSelector } from 'react-redux'
let myMap: L.Map

const focusResultIcon = L.icon({
  iconUrl: 'assets/icons/focused-map-marker.svg',
  iconSize: [34, 85],
  iconAnchor: [17, 84],
  popupAnchor: [17, -76]
})

const blurredResultIcon = L.icon({
  iconUrl: 'assets/icons/blurred-map-marker.svg',
  iconSize: [22, 55],
  iconAnchor: [11, 54],
  popupAnchor: [11, -76]
})

const MapEmbed: React.SFC = () => {
  
  const results: Array<string> = useSelector( (state: AppState) => state.searchResults )
  const mapCenter: {lat: number, lng: number} = useSelector( (state: AppState) => state.mapCenter )
  const mapZoom: number = useSelector( (state: AppState) => state.mapZoom )
  const locations: {[key: string]: StateLocation } = useSelector( (state: AppState) => state.locations )
  // const dispatch = useDispatch()
  

  
  useEffect( () => {
    myMap = L.map('map',{zoomSnap: 0}).setView([37.090240,-95.712891], 4.6)
    const Stamen_Terrain =
    L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}',
    {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: 'abcd',
      minZoom: 4,
      maxZoom: 14,
      // @ts-ignore - this isn't in the typing, but is required
      ext: 'png'
    });
    Stamen_Terrain.addTo(myMap)
  },[])
  
  useEffect( () => {
    myMap.setView([mapCenter.lat,mapCenter.lng],mapZoom)
    results.forEach( (locID,idx) => {
      console.log(locations[locID].latitude,locations[locID].longitude)
      const markerIcon = (idx === 0) ? focusResultIcon : blurredResultIcon
      L.marker([locations[locID].latitude,locations[locID].longitude],{
        icon: markerIcon
      }).addTo(myMap)
    })
  },[results,mapCenter,mapZoom])

  return (
    <figure className="map-embed">
      <div id="map"/>
    </figure>
  )
}

export default MapEmbed