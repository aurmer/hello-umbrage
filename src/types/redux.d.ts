

type AppState = {
  locations: StateLocationSet,
  searchInputString: string,
  searchQuery: string,
  searchResults: Array<string>,
  mapCenter: {
    lat: number,
    lng: number,
  } | null,
  mapZoom: number | null
}

type CustAction = {
  type: string,
  value?: string 
}

type LotLocation = {
  name: string,
  price: number,
  streetAddress: string,
  location: string,
  netAcreage: number,
  active: boolean,
  latitude: number,
  longitude: number,
  image: string
}

type StateLocation = {
  name: string,
  price: number,
  streetAddress: string,
  location: string,
  netAcreage: number,
  active: boolean,
  latitude: number,
  longitude: number,
  image: string,
  favorite: boolean
}

type StateLocationSet = {
  [key: string]: StateLocation
}

interface String {
  reverse(): string;
}

type MyLatLngArray = {
  [key: string]: MyLatLng
}

type MyLatLng = {
  lat: number,
  lng: number
}