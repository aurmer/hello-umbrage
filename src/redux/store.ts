import { createStore, Reducer } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { locations } from '../constants'


const initState: AppState = {
  locations: {},
  searchInputString: "",
  submittedSearch: "",
  searchResults: [],
  mapCenter: {lat:31.1352,lng:-99.3351},
  mapZoom: 6.5
}

function deepCopy (obj1: any): any {
  return JSON.parse(JSON.stringify(obj1))
}

function filterLocationsBySearch (searchStr: string,acc: Array<string>,loc: StateLocation): Array<string> {
  const lowerSearch = searchStr.toLowerCase()
  if( lowerSearch.length > 0 &&
      (loc.name.toLowerCase().includes(lowerSearch) ||
      loc.streetAddress.toLowerCase().includes(lowerSearch))) {
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
  return distA - distB
}

function calcMapZoom (markers: {[key: string]: {lat: number,lng: number}},center: {lat: number,lng: number}) {
  const largestDist = Object.values(markers).reduce( (acc: number, mark: {lat: number,lng: number}): number => {
    const distFromCenter = Math.sqrt( Math.pow(mark.lat - center.lat,2) + Math.pow(mark.lng-center.lng,2) )
    return Math.max(acc,distFromCenter)
  },0)
  
  if(largestDist === 0) {
    return 13
  }
  return -3 * largestDist + 11
}

function calcMapStateAndSortResults (state: AppState,unsortedResults: Array<string>): {newMapCenter: {lat:number,lng:number} | null, newMapZoom: number | null, sortedResults: Array<string>} {
  const locs = state.locations
  const markerCollection: {[key: string]: {lat: number,lng: number}} = {}
  let latSum = 0
  let longSum = 0
  
  unsortedResults.forEach( (locID: string) => {
    markerCollection[locID] = {lat:locs[locID].latitude, lng:locs[locID].longitude}
    latSum += locs[locID].latitude
    longSum += locs[locID].longitude
  },{})
  
  let mapCenter = null
  let mapZoom = null
  let sortedResults: Array<string> = []
  
  const locCount = unsortedResults.length
  if(locCount > 0) {
    mapCenter = {lat:latSum/locCount,lng:longSum/locCount}
    mapZoom = calcMapZoom(markerCollection,mapCenter)
  }
  
  if(mapCenter) {
    sortedResults = unsortedResults.sort(sortByDist.bind(null,state,mapCenter))
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

  else if (action.type === "TOGGLE_FAVORITE" && typeof action.value === "string") {
    newState.locations[action.value].favorite = !newState.locations[action.value].favorite
  }

  else if (action.type === "UPDATE_SEARCH" && typeof action.value === "string") {
    newState.searchInputString = action.value
  }

  else if (action.type === "SUBMIT_SEARCH" && newState.searchInputString !== "") {
    newState.submittedSearch = newState.searchInputString.trim()
    newState.searchInputString = newState.searchInputString.trim()
    const unsortedSearchResults = Object.values(newState.locations).reduce(filterLocationsBySearch.bind(null,newState.submittedSearch),[])
    const {newMapCenter,newMapZoom,sortedResults} = calcMapStateAndSortResults(newState,unsortedSearchResults)
    newState.mapCenter = newMapCenter
    newState.mapZoom = newMapZoom
    newState.searchResults = sortedResults
  }

  else if (action.type === "SELECT_RESULT" && typeof action.value === "string") {
    let matchingIdx: number = -1
    newState.searchResults.forEach( (locID,idx)=> {
      if(locID === action.value) {
        matchingIdx = idx
      } 
    })
    
    if(matchingIdx >= 0) {
      const matchingElement: Array<string> = newState.searchResults.splice(matchingIdx,1)
      newState.searchResults = [...matchingElement,...newState.searchResults]
    }
  }

  return newState
}

export default () => createStore(reducer,initState,composeWithDevTools())
