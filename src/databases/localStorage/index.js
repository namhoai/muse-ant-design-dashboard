export const saveToLocalStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, value);
  } catch (e) {
    // Do something
  }
};

export const saveToLocalStorageObject = (key, value) => {
  try {
    const serializedStore = JSON.stringify(value);
    window.localStorage.setItem(key, serializedStore);
  } catch (e) {
    // Do something
  }
};

export const loadFromLocalStorage = (key) => {
  try {
    const value = window.localStorage.getItem(key);
    if (value === null) return undefined;
    return value;
  } catch (e) {
    return undefined;
  }
};

export const loadFromLocalStorageObject = (key) => {
  try {
    const serializedStore = window.localStorage.getItem(key);
    if (serializedStore === null) return undefined;
    return JSON.parse(serializedStore);
  } catch (e) {
    return undefined;
  }
};

export const loadFromLocalStorageObjectFromBase64 = (key) => {
  try {
    const serializedStore = window.localStorage.getItem(key);
    if (serializedStore === null) return undefined;
    const tokenEncode = atob(serializedStore);
    return JSON.parse(tokenEncode);
  } catch (e) {
    return undefined;
  }
};

export const removeFromLocalStorage = (key) => {
  if (typeof key === 'string') {
    window.localStorage.removeItem(key);
    return;
  }
  for (let i = 0; i < key.length; i++) {
    window.localStorage.removeItem(key[i]);
  }
};
