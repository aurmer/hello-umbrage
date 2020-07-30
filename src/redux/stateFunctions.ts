//Array Reducer function with a bound search string as first param
//Filters locations and maps it to an array of LocationID's
export function filterLocationsBySearch (searchStr: string,acc: Array<string>,loc: StateLocation): Array<string> {
  const lowerSearch = searchStr.toLowerCase()
  //if the search is more than empty AND it matches name or address
  if(lowerSearch.length > 0 &&
      (loc.name.toLowerCase().includes(lowerSearch) ||
       loc.streetAddress.toLowerCase().includes(lowerSearch))) {
          const locID = loc.name+loc.streetAddress
          acc.push(locID)
  }
  return acc
}

//using search results, calculates a new map view (based on result positions and distance from one another)
//also sorts results by the distance from the chosen center of map
//provides consistency in results, and a focused map marker as close to the center as possible with tight zoom
export function calcMapStateAndSortResults (state: AppState,unsortedResults: Array<string>): {newMapCenter: {lat:number,lng:number} | null, newMapZoom: number | null, sortedResults: Array<string>} {
  const locs = state.locations
  const markerCollection: MyLatLngArray = {}
  let latSum = 0
  let longSum = 0
  
  unsortedResults.forEach( (locID: string) => {
    markerCollection[locID] = {lat:locs[locID].latitude, lng:locs[locID].longitude}
    latSum += locs[locID].latitude
    longSum += locs[locID].longitude
  },{})
  
  let mapCenter: MyLatLng | null = null
  let mapZoom: number | null = null
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

//array sort function with state bound as first param
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

//calculates new map view given a set of locations
//linear regression used as basis for zoom level given the geographic spread of results
function calcMapZoom (markers: MyLatLngArray,center: MyLatLng) {
  const largestDist = Object.values(markers).reduce( (acc: number, mark: MyLatLng): number => {
    const distFromCenter = Math.sqrt( Math.pow(mark.lat - center.lat,2) + Math.pow(mark.lng-center.lng,2) )
    return Math.max(acc,distFromCenter)
  },0)
  
  return (largestDist === 0) ? 13 : -3 * largestDist + 11
}