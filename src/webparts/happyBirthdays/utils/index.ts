export const KEY_LOCAL_CONFIG = 'config';
export const KEY_LOCAL_BIRTHDAYS = 'birthdays';
export const KEY_LOCAL_GALLERY = 'gallery';

export const clearLocalData = () => {
  localStorage.removeItem(KEY_LOCAL_CONFIG);
  localStorage.removeItem(KEY_LOCAL_BIRTHDAYS);
  localStorage.removeItem(KEY_LOCAL_GALLERY);
};
