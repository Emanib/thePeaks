import NavBar from "./NavBar"
import Select from './Select'
import { useState,  useCallback ,useEffect} from 'react'
import CardNews from './cards/CardNews'
import Footer from './Footer'
export default function Layout({ children })
{
   const [ setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [sorting, setSorting] = useState('newest')
  const [searchResult, setSearchResult] = useState([])
    const debounce = (func) =>
  {
    let timer;
    return function (...args)
    {
      const context = this;
      if (timer) clearTimeout(timer)
      timer = setTimeout(() =>
      {
        timer = null;
        func.apply(context, args)
      }, 500)
    }

  }
   const handleSorting = (e) =>
  {
    setSorting(e.target.value)
  }
  const search = async (value) =>
  {

    try 
    {
      if (!value) return
      setSearchResult([]) 
      const result = await fetch(`${process.env.REACT_APP_API_URL}search?q=${value}&page-size=5&api-key=${process.env.REACT_APP_API_KEY}&show-fields=all&order-by=${sorting}`);
        const allItems = await result.json();
        setSearchResult((prevNews) =>
        {
          return [...new Set([...prevNews, ...allItems.response.results])]
        })
      setSearchTerm(value)
      
    } catch (error)
    {
      console.log(error)
      setLoading(false)

    }

  }
   const optimizeFn = useCallback(debounce(search), [sorting])

  const handleSearch = (e) =>
  {
    setSearchTerm(optimizeFn(e.target.value))
  }
  
  useEffect(() =>
  {

     search()
   },[sorting])
  const getSearchResult = () =>
  {
    return (
      <> 
      <div className="container">
        <div   className="header"> 
        <h1>Search Results</h1>
          <Select orderby={sorting} onChange={handleSorting} />
          </div>
        <div className="search-grid" > 
   {   searchResult?.map((item) => (
        <div key={item.id}>
       <CardNews img={item?.fields?.thumbnail}
           webTitle={item.webTitle}
           headline={item.fields.headline}
       />
        </div>
   ))
          }
        </div>

        </div>
         <Footer />
        </>
    )
  }

  return (
    <> 
      <NavBar search={searchTerm} handleChange={handleSearch} /> 
      <div>
      { !searchTerm?  children : getSearchResult()}
      </div>
    </>
  )
}
