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
  myMap = L.map('map',{zoomSnap: .25}).setView([37.090240,-95.712891], 4.6)
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
  Stamen_Terrain.addTo(myMap)
}

function removeAllMarkers (markers: Array<L.Marker>): void {
  const originalMarkersCount = markers.length
  for(let i=0;i<originalMarkersCount;i++) {
    markers[0].remove()
    markers.shift()
  }
}

function renderPopup (loc: StateLocation): string {
  return `
    <div class="popup-container">
      <div class="list-name">
      ${loc.name}
      </div>
      <div class="list-price">
        ${formatPrice(loc.price)}
      </div>
      <div class="list-data-label">
      Net Mineral Acreage
      </div>
      <div class="list-data">
      ${loc.netAcreage}
      </div>
    </div>
  `
}

const MapEmbed: React.SFC = () => {
  
  const appState: AppState = useSelector( (state: AppState) => state )
  
  const results: Array<string> = appState.searchResults
  const mapCenter: {lat: number, lng: number} | null = appState.mapCenter
  const mapZoom: number | null = appState.mapZoom
  const locations: {[key: string]: StateLocation } = appState.locations
  const submittedSearch: string = appState.searchQuery
  
  const dispatch = useDispatch()
  
  //only called once on initial render
  useEffect(initMap,[])
  
  useEffect( () => {
    removeAllMarkers(markerArray)

    results.forEach( (locID,idx) => {
      const markerIcon = (idx === 0) ? focusResultIcon : blurredResultIcon
      const newMarker = L.marker([locations[locID].latitude,locations[locID].longitude],{
        icon: markerIcon,
        alt: locations[locID].name + locations[locID].streetAddress
      })
      
      const markerNode = newMarker.addTo(myMap)

      markerNode.bindPopup(renderPopup(locations[locID]))

      markerNode.addEventListener('mouseover', (e: LeafletEvent) => {
        e.target.openPopup();
      })

      markerNode.addEventListener('click', (e: LeafletEvent) => {
        const locID = e.sourceTarget._icon.alt
        dispatch({type:"SELECT_RESULT",value: locID})
      })

      markerArray.push(newMarker)
    })
    //useEffect dependancy is serialized to prevent 'Referential Inequality' from triggering this useEffect
  },[JSON.stringify(results)])

  useEffect( () => {
    if (mapCenter && mapZoom) {
      myMap.setView([mapCenter.lat,mapCenter.lng],mapZoom)
    }
  },[mapZoom,mapCenter?.lat,mapCenter?.lng,submittedSearch])

  return (
    <figure className="map-embed">
      <div id="map"/>
    </figure>
  )
}

export default MapEmbed