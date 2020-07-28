import { createStore, Reducer } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { locations } from '../constants'


const initState: AppState = {
  searchInputString: "",
  submittedSearch: "",
  searchResults: []
}

function deepCopy (obj1: any): any {
  return JSON.parse(JSON.stringify(obj1))
}

function locationsBySearch (searchStr: string,location: LotLocation): boolean {
  if( location.name.includes(searchStr) ||
      location.streetAddress.includes(searchStr)) {
        return true
      }
    return false
}

function sortLocations (locA: LotLocation, locB: LotLocation): number {
  return (locA.name < locB.name) ? -1 : 1
}

const reducer: Reducer<AppState, CustAction> = (oldState: (AppState | undefined),action: CustAction) => {
  
  const newState: AppState = (oldState) ? deepCopy(oldState) : initState
  const actionType: string = action.type

  if (actionType === "UPDATE_SEARCH" && typeof action.value === "string") {
    newState.searchInputString = action.value
  }

  else if (actionType === "SUBMIT_SEARCH" && newState.searchInputString !== "") {
    newState.submittedSearch = newState.searchInputString
    newState.searchResults = locations.filter(locationsBySearch.bind(null,newState.submittedSearch)).sort(sortLocations)
  }

  return newState
}

export default () => createStore(reducer,initState,composeWithDevTools())
