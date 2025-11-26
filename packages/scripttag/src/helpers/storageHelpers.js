const getStorage = key => {
  const value = localStorage.getItem(key);
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

const setStorage = (key, value) => {
  try {
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing storage key ${key}`, e);
  }
};

const removeStorage = key => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error(`Error removing storage key ${key}`, e);
  }
};

export {getStorage, setStorage, removeStorage};
