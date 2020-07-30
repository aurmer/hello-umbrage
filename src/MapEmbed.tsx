import React, { useEffect } from 'react'
import L, { LeafletEvent } from 'leaflet'
import { useSelector, useDispatch } from 'react-redux'
import { formatPrice } from './util'

let myMap: L.Map
const markerArray: Array<L.Marker> = []

const focusResultIcon = L.icon({
  iconUrl: 'assets/icons/focused-map-marker.svg',
  iconSize: [34, 50],
  iconAnchor: [17, 50],
  popupAnchor: [0, -53]
})

const blurredResultIcon = L.icon({
  iconUrl: 'assets/icons/blurred-map-marker.svg',
  iconSize: [22, 32],
  iconAnchor: [11, 32],
  popupAnchor: [0, -35]
})

/*
 *  INITIALIZE MAP
 */
const initMap = () => {
  // @ts-ignore
  window.myMap = L.map('map',{zoomSnap: .25}).setView([37.090240,-95.712891], 4.6)
  const Stamen_Terrain =
  L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}',
  {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 4,
    maxZoom: 13,
    // @ts-ignore - @types/leaflet isn't up to date with leaflet.
    // This prop is required by lib, but not included by type definition.
    ext: 'png'
  })
  // @ts-ignore
  Stamen_Terrain.addTo(window.myMap)
}

function removeAllMarkers (markers: Array<L.Marker>): void {
  const originalMarkersCount = markers.length
  for(let i=0;i<originalMarkersCount;i++) {
    markers[0].remove()
    markers.shift()
  }
}

const MapEmbed: React.SFC = () => {
  
  const results: Array<string> = useSelector( (state: AppState) => state.searchResults )
  const mapCenter: {lat: number, lng: number} | null = useSelector( (state: AppState) => state.mapCenter )
  const mapZoom: number | null = useSelector( (state: AppState) => state.mapZoom )
  const locations: {[key: string]: StateLocation } = useSelector( (state: AppState) => state.locations )
  const dispatch = useDispatch()
  
  //only called once on initial render
  useEffect(initMap,[])
  
  useEffect( () => {
    removeAllMarkers(markerArray)

    if (mapCenter && mapZoom) {
      // @ts-ignore
      window.myMap.setView([mapCenter.lat,mapCenter.lng],mapZoom)
    }

    results.forEach( (locID,idx) => {
      const markerIcon = (idx === 0) ? focusResultIcon : blurredResultIcon
      const newMarker = L.marker([locations[locID].latitude,locations[locID].longitude],{
        icon: markerIcon,
        alt: locations[locID].name + locations[locID].streetAddress
      })
      
      // @ts-ignore
      const markerNode = newMarker.addTo(window.myMap)

      markerNode.bindPopup(`
        <div class="popup-container">
          <div class="list-name">
          ${locations[locID].name}
          </div>
          <div class="list-price">
            ${formatPrice(locations[locID].price)}
          </div>
          <div class="list-data">
          ${locations[locID].netAcreage} acres
          </div>
        </div>
      `)
      markerNode.addEventListener('mouseover', (e: LeafletEvent) => {
        e.target.openPopup();
      })

      markerNode.addEventListener('click', (e: LeafletEvent) => {
        // @ts-ignore
        const locID = e.originalEvent.target.alt
        dispatch({type:"SELECT_RESULT",value: locID})
        // @ts-ignore
        window.myMap.closePopup()
      })

      markerArray.push(newMarker)
    })
    //dependancy is serialized to prevent 'Referential Inequality' from triggering this useEffect
  },[JSON.stringify(results)])

  return (
    <figure className="map-embed">
      <div id="map"/>
    </figure>
  )
}

export default MapEmbed