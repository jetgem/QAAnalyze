const initialState = {
  qrURL: ""
};

export function scanner(state = initialState, action) {
  switch (action.type) {
    case 'SAVE_QR_DATA':
        return { ...state, qrURL: action.url }
    default:
      return state;
  }
}
