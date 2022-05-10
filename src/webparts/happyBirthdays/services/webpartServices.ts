import { Web } from 'sp-pnp-js/lib/sharepoint/webs';
import { BirthdaysResponse, Birthday } from '../types';
// import { Web } from '@pnp/sp/presets/all';
const URL_SITE = 'https://devfor.sharepoint.com/sites/SiteBD/';
const URL_CONFIG_LIST = 'Config';
const URL_BIRTHDAYS_LIST = 'Birthdays';
const URL_MESSAGES_LIST = 'Congratulations';

export const getConfig = async () => {
  const web = new Web(URL_SITE);
  const result = await web.lists.getByTitle(URL_CONFIG_LIST).items.getAll();
  return result;
};

export const getBirthdays = async (): Promise<Birthday[]> => {
  const web = new Web(URL_SITE);
  const result = (await web.lists
    .getByTitle(URL_BIRTHDAYS_LIST)
    .items.select('ID', 'Title', 'Birthday', 'Email')
    .getAll()) as BirthdaysResponse;

  console.log(result);
  const birthdays = result.map(item => {
    return {
      id: item.ID,
      person: item.Title,
      birthday: item.Birthday,
      email: item.Email,
    };
  });

  return birthdays;
};
