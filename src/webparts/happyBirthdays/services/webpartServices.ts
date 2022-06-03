import { Web } from 'sp-pnp-js/lib/sharepoint/webs'
import {
  BirthdaysResponse,
  Birthday,
  ConfigResponse,
  Config,
  MessageListItem,
  ImagesResponse,
  Image,
} from '../types'
import * as moment from 'moment'
import {
  KEY_LOCAL_BIRTHDAYS,
  KEY_LOCAL_CONFIG,
  KEY_LOCAL_GALLERY,
} from '../utils'
// import { Web } from '@pnp/sp/presets/all';
const URL_SITE = 'https://devfor.sharepoint.com/sites/SiteBD/'
const URL_CONFIG_LIST = 'ConfigWebpart'
const URL_BIRTHDAYS_LIST = 'Birthdays'
const URL_MESSAGES_LIST = 'Congratulations'
const URL_IMAGES_LIST = 'ConfigImages'

export const getConfig = async (): Promise<Config> => {
  const localConfig = localStorage.getItem(KEY_LOCAL_CONFIG)

  if (localConfig) {
    return JSON.parse(localConfig) as Config
  }

  const web = new Web(URL_SITE)
  const result = (await web.lists
    .getByTitle(URL_CONFIG_LIST)
    .items.select(
      'ID',
      'Title',
      'MainImage',
      'CardBackground',
      'CurrentBirthdayImage',
      'NextBirthdayImage'
    )
    .top(1)
    .get()) as ConfigResponse

  const [config] = result
  const configToReturn = {
    id: config.ID,
    title: config.Title,
    mainImage: config.MainImage,
    backgroundCard: config.CardBackground,
    currentBirthdayImage: config.CurrentBirthdayImage,
    nextBirthdayImage: config.NextBirthdayImage,
  }
  localStorage.setItem(KEY_LOCAL_CONFIG, JSON.stringify(configToReturn))

  return configToReturn
}

export const getBirthdays = async (): Promise<Birthday[]> => {
  const localBirthdays = localStorage.getItem(KEY_LOCAL_BIRTHDAYS)

  if (localBirthdays) {
    return JSON.parse(localBirthdays) as Birthday[]
  }

  const month = moment().format('MM')
  const web = new Web(URL_SITE)
  const result = (await web.lists
    .getByTitle(URL_BIRTHDAYS_LIST)
    .items.select('ID', 'Title', 'Birthday', 'Email')
    .getAll()) as BirthdaysResponse

  const birthdays = result.map(item => {
    return {
      id: item.ID,
      person: item.Title,
      birthday: item.Birthday,
      email: item.Email,
    }
  })

  const birthdaysOnlyMonth = birthdays.filter(
    i => moment(i.birthday).format('MM') == month
  )

  localStorage.setItem(KEY_LOCAL_BIRTHDAYS, JSON.stringify(birthdaysOnlyMonth))

  return birthdaysOnlyMonth
}

export const getImages = async (): Promise<Image[]> => {
  const localImages = localStorage.getItem(KEY_LOCAL_GALLERY)

  if (localImages) {
    return JSON.parse(localImages) as Image[]
  }

  const web = new Web(URL_SITE)
  const result = (await web.lists
    .getByTitle(URL_IMAGES_LIST)
    .items.select('ID', 'Title')
    .getAll()) as ImagesResponse

  const images = result.map(i => {
    return { id: i.ID, url: i.Title }
  })

  localStorage.setItem(KEY_LOCAL_GALLERY, JSON.stringify(images))
  return images
}

export const sendMessage = async (item: MessageListItem) => {
  const web = new Web(URL_SITE)
  const result = await web.lists.getByTitle(URL_MESSAGES_LIST).items.add(item)
  return result.data
}
