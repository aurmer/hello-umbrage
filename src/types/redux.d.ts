

type AppState = {
  searchInputString: string,
  submittedSearch: string,
  searchResults: Array<LotLocation>
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