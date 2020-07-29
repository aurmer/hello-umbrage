import { createStore, Reducer } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { locations } from '../constants'


const initState: AppState = {
  locations: {},
  searchInputString: "",
  submittedSearch: "",
  searchResults: [],
  mapCenter: {lat:37.090240,lng:-95.712891},
  mapZoom: 4.6,
}

function deepCopy (obj1: any): any {
  return JSON.parse(JSON.stringify(obj1))
}

function filterLocationsBySearch (searchStr: string,acc: Array<string>,loc: StateLocation): Array<string> {
  if( loc.name.includes(searchStr) ||
      loc.streetAddress.includes(searchStr)) {
        const locID = loc.name+loc.streetAddress
        acc.push(locID)
      }
    return acc
}


function sortByDist (state: AppState,center: {lat:number,lng:number},locIdA: string,locIdB: string): number {
  const aLat = state.locations[locIdA].latitude
  const aLng = state.locations[locIdA].longitude
  const bLat = state.locations[locIdB].latitude
  const bLng = state.locations[locIdB].longitude
  const cLat = center.lat
  const cLng = center.lng

  const distA = Math.sqrt( Math.pow(cLat-aLat,2) + Math.pow(cLng-aLng,2) )
  const distB = Math.sqrt( Math.pow(cLat-bLat,2) + Math.pow(cLng-bLng,2) )
  return distB - distA
}

function calcMapZoom (markers: {[key: string]: {lat: number,lng: number}},center: {lat: number,lng: number}) {
  const largestDist = Object.values(markers).reduce( (acc: number, mark: {lat: number,lng: number}): number => {
    const distFromCenter = Math.sqrt( Math.pow(mark.lat - center.lat,2) + Math.pow(mark.lng-center.lng,2) )
    return Math.max(acc,distFromCenter)
  },0)
  console.log(largestDist)
  return 8
}

function calcMapStateAndSortResults (state: AppState,unsortedResults: Array<string>): {newMapCenter: {lat:number,lng:number}, newMapZoom: number, sortedResults: Array<string>} {
  const locs = state.locations
  const markerCollection: {[key: string]: {lat: number,lng: number}} = {}
  let latSum = 0
  let longSum = 0
  const locCount = unsortedResults.length

  unsortedResults.forEach( (locID: string) => {
    markerCollection[locID] = {lat:locs[locID].latitude, lng:locs[locID].longitude}
    latSum += locs[locID].latitude
    longSum += locs[locID].longitude
  },{})

  let mapCenter = state.mapCenter
  let mapZoom = state.mapZoom
  let sortedResults = state.searchResults

  if(locCount) {
    mapCenter = {lat:latSum/locCount,lng:longSum/locCount}
    sortedResults = unsortedResults.sort(sortByDist.bind(null,state,state.mapCenter))
    mapZoom = calcMapZoom(markerCollection,state.mapCenter)
  }

  return {
    newMapCenter: mapCenter,
    newMapZoom: mapZoom,
    sortedResults: sortedResults
  }
}

const reducer: Reducer<AppState, CustAction> = (oldState: (AppState | undefined),action: CustAction) => {
  
  const newState: AppState = (oldState) ? deepCopy(oldState) : initState
  
  if (action.type === "POPULATE_LOCATIONS") {
    newState.locations = locations.reduce( (acc,loc) => ({...acc,[loc.name+loc.streetAddress]:{...loc,favorite: false}}),{})
  }

  if (action.type === "TOGGLE_FAVORITE" && typeof action.value === "string") {
    newState.locations[action.value].favorite = !newState.locations[action.value].favorite
  }

  if (action.type === "UPDATE_SEARCH" && typeof action.value === "string") {
    newState.searchInputString = action.value
  }

  else if (action.type === "SUBMIT_SEARCH" && newState.searchInputString !== "") {
    newState.submittedSearch = newState.searchInputString
    const unsortedSearchResults = Object.values(newState.locations).reduce(filterLocationsBySearch.bind(null,newState.submittedSearch),[])
    const {newMapCenter,newMapZoom,sortedResults} = calcMapStateAndSortResults(newState,unsortedSearchResults)
    newState.mapCenter = newMapCenter
    newState.mapZoom = newMapZoom
    newState.searchResults = sortedResults
  }

  return newState
}

export default () => createStore(reducer,initState,composeWithDevTools())
