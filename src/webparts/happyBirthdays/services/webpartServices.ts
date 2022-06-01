import { Web } from 'sp-pnp-js/lib/sharepoint/webs'
import { BirthdaysResponse, Birthday, ConfigResponse, Config } from '../types'
import * as moment from 'moment'
// import { Web } from '@pnp/sp/presets/all';
const URL_SITE = 'https://devfor.sharepoint.com/sites/SiteBD/'
const URL_CONFIG_LIST = 'ConfigWebpart'
const URL_BIRTHDAYS_LIST = 'Birthdays'
const URL_MESSAGES_LIST = 'Congratulations'

export const getConfig = async (): Promise<Config> => {
  const localConfig = localStorage.getItem('config')

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
  localStorage.setItem('config', JSON.stringify(configToReturn))

  return configToReturn
}

export const getBirthdays = async (): Promise<Birthday[]> => {
  const localBirthdays = localStorage.getItem('birthdays')

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

  localStorage.setItem('birthdays', JSON.stringify(birthdaysOnlyMonth))

  return birthdaysOnlyMonth
}

interface MessageListItem {
  Title: string
  Message: string
  UrlImage: string
}

export const sendMessage = async (item: MessageListItem) => {
  const web = new Web(URL_SITE)
  const result = await web.lists.getByTitle(URL_MESSAGES_LIST).items.add(item)
  return result.data
}
