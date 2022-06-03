export interface User {
  username: string
  email: string
}

export interface Birthday {
  id?: number
  person: string
  birthday: Date
  email: string
}
export interface Image {
  id?: number
  url: string
}

export interface Config {
  id?: number
  title: string
  mainImage?: string
  backgroundCard?: string
  currentBirthdayImage?: string
  nextBirthdayImage?: string
}

export interface BirthdaysItemReponse {
  ID: number
  Title: string
  Birthday: Date
  Email: string
}

export interface ConfigItemResponse {
  CardBackground: string
  CurrentBirthdayImage: string
  ID: number
  Id: number
  MainImage: string
  NextBirthdayImage: string
  Title: string
  'odata.editLink': string
  'odata.etag': string
  'odata.id': string
  'odata.type': string
}

export interface MessageListItem {
  Title: string
  Message: string
  UrlImage: string
}

export interface ImageItemList {
  ID: number
  Title: string
}

export type BirthdaysResponse = BirthdaysItemReponse[]
export type ConfigResponse = ConfigItemResponse[]
export type ImagesResponse = ImageItemList[]
