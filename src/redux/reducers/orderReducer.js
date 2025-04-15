const initialState = {
    language: null,
    orders: [],
    selectedService: null, // New state for selected service
  };
  
  const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_LANGUAGE':
        return { ...state, language: action.payload };
      case 'SUBMIT_ORDER':
        return { ...state, orders: [...state.orders, action.payload] };
      case 'SET_SELECTED_SERVICE':
        return { ...state, selectedService: action.payload };
      default:
        return state;
    }
  };
  
  export default orderReducer;