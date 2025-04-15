export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SUBMIT_ORDER = 'SUBMIT_ORDER';
export const SET_SELECTED_SERVICE = 'SET_SELECTED_SERVICE';

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language,
});

export const submitOrder = (orderData) => ({
  type: SUBMIT_ORDER,
  payload: orderData,
});

export const setSelectedService = (service) => ({
  type: SET_SELECTED_SERVICE,
  payload: service,
});