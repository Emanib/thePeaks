const bookMarkReducer = (state, action) =>
{
  switch (action.type)
  {
    case 'ADD': return { ...state, bookList: [action.payload, ...state.bookList] };
    case 'Remove': return { ...state, bookList: state.bookList.filter((article) => article.id !== action.payload) };
    case 'sort': return { ...state, sorting: action.payload }
    case 'search': return { ...state, searchTerm: action.payload }
    default:
      return state
  }
}
export default bookMarkReducer;