import { createStore, Reducer } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { locations } from '../constants'
import { deepCopy } from '../util'
import { filterLocationsBySearch,calcMapStateAndSortResults } from './stateFunctions'

//State in which the app starts
const initState: AppState = {
  locations: {},
  searchInputString: "",
  searchQuery: "",
  searchResults: [],
  mapCenter: {lat:31.4052,lng:-99.3351},
  mapZoom: 6.5
}

//Reducer for this app's store
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
    newState.searchInputString = newState.searchInputString.trim()
    newState.searchQuery = newState.searchInputString

    //filter by search and map to only id's
    const unsortedSearchResults = Object.values(newState.locations).reduce(filterLocationsBySearch.bind(null,newState.searchQuery),[])

    //create new map view and sort results by closet to center of view
    const {newMapCenter,newMapZoom,sortedResults} = calcMapStateAndSortResults(newState,unsortedSearchResults)

    //update state with new values
    newState.mapCenter = newMapCenter
    newState.mapZoom = newMapZoom
    newState.searchResults = sortedResults
  }

  else if (action.type === "SELECT_RESULT" && typeof action.value === "string") {
    //find matching index, splice the match out of the array and create a new array with it at the front
    const matchingIdx: number = newState.searchResults.findIndex((locID)=>locID === action.value)
    if(matchingIdx >= 0) {
      const matchingElement: Array<string> = newState.searchResults.splice(matchingIdx,1)
      newState.searchResults = [...matchingElement,...newState.searchResults]
    }
  }

  return newState
}

export default () => createStore(reducer,initState,composeWithDevTools())