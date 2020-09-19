class Place {
  id: string
  title: string
  image: string
  location: string
  address: string

  constructor(
    id: string,
    title: string,
    image: string,
    location: string,
    address: string
  ) {
    this.id = id
    this.title = title
    this.image = image
    this.location = location
    this.address = address
  }
}

export default Place
