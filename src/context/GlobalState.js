import { createContext, useReducer, useEffect } from "react";
import bookMarkReducer from './Reducer'
const initialState = {
  bookList: localStorage.getItem('booklist') ? JSON.parse(localStorage.getItem('booklist')) : [],
  sorting: "newest"
}
export const GlobalContext = createContext(initialState)
export const GlobalProvider = (props) =>
{
  const [state, dispatch] = useReducer(bookMarkReducer, initialState)
  useEffect(() =>
  {
    localStorage.setItem('booklist', JSON.stringify(state.bookList))

  }, [state])
  // console.log(state, "globalState")
  // actions 
  const addArticleToBookList = (article) =>
  {
    dispatch({ type: 'ADD', payload: article })
  }
  const removeArticleFromBookList = (id) =>
  {
    dispatch({ type: 'Remove', payload: id })

  }
  const handleSorting = (e) =>
  {
    dispatch({ type: 'sort', payload: e.target.value })
  }
  const data = {
    bookMarkList: state.bookList,
    addArticleToBookList,
    removeArticleFromBookList,
    handleSorting,
    sorting: state.sorting
  }
  return (
    <GlobalContext.Provider
      value={data}
      // {{ bookMarkList: state.bookList, addArticleToBookList, removeArticleFromBookList, handleSorting, sorting: state.sorting }}

    >
      {props.children}
    </GlobalContext.Provider>
  )
}