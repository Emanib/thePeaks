const bookMarkReducer = (state, action) =>
{
  switch (action.type)
  {
    case 'ADD': return { ...state, bookList: [action.payload, ...state.bookList] };
    case 'Remove': return { ...state, bookList: state.bookList.filter((article) => article.id !== action.payload) };
    default:
      return state
  }
}
export default bookMarkReducer;