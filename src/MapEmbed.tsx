import React, { useEffect } from 'react'
import L, { LeafletEvent } from 'leaflet'
import { useSelector, useDispatch } from 'react-redux'
import { formatPrice } from './util'

//persistent Leaflet objects
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


//This component is the Leaflet map
const MapEmbed: React.SFC = () => {
  
  //access and reference state variables from store
  const appState: AppState = useSelector( (state: AppState) => state )
  const results: Array<string> = appState.searchResults
  const mapCenter: {lat: number, lng: number} | null = appState.mapCenter
  const mapZoom: number | null = appState.mapZoom
  const locations: StateLocationSet = appState.locations
  const searchQuery: string = appState.searchQuery
  const dispatch = useDispatch()
  
  //only called once, on initial render
  useEffect(()=>initMap(),[])
  
  //`updateMarkers()` depends only on sorted search `results`
  // the next line throws a useEffect dependency warning - dependencies are thought through and intentional
  // eslint-disable-next-line
  useEffect(()=>updateMarkers(results,locations,dispatch),[JSON.stringify(results)])

  
  //`updateView()` depends on `zoom`, `mapCenter`, and `searchQuery`
  // the next line throws a useEffect dependency warning - dependencies are thought through and intentional
  // eslint-disable-next-line
  useEffect( ()=>updateView(mapCenter,mapZoom) ,[mapCenter?.lat,mapCenter?.lng,mapZoom,searchQuery])

  return (
    <figure className="map-embed">
      <div id="map"/>
    </figure>
  )
}

//Map initialization; runs once at render
function initMap () {
  myMap = L.map('map',{zoomSnap: .25}).setView([0,0], 4.6)
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

//Runs every time sorted search results updates
function updateMarkers (results: Array<string>,locations: StateLocationSet,dispatchFn: Function) {
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
      dispatchFn({type:"SELECT_RESULT",value: locID})
    })

    markerArray.push(newMarker)
  })
}

//Runs every time map view changes to new number value in state
function updateView (mapCenter: {lat:number,lng:number} | null,mapZoom: number | null) {
  if (mapCenter && mapZoom) {
    myMap.setView([mapCenter.lat,mapCenter.lng],mapZoom)
  }
}

//for every marker in array, remove it from map AND from array
function removeAllMarkers (markers: Array<L.Marker>): void {
  const originalMarkersCount = markers.length
  for(let i=0;i<originalMarkersCount;i++) {
    markers[0].remove()
    markers.shift()
  }
}

//`renderPopup()` returns HTML string for popup for the given location
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

export default MapEmbed