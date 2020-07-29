

type ListingSnippetProps = {
  label: string,
  data: string
}

type ListingInfoProps = {
  name: string,
  price: number,
  active: boolean,
  address: string,
  acreage: number,
  location: string,
  favorite: boolean,
  ppa: number
}

interface String {
  reverse(): string;
}