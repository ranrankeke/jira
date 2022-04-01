const myReducer = (state, action) => {
  switch (action.type) {
    case ('countUp'):
      return {
        ...state,
        count: state.count + 1
      }
    default:
      return state;
  }
}
export default myReducer