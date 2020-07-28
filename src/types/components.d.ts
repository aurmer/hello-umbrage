

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
  ppa: number
}

interface String {
  reverse(): string;
}