
import CardNews from '../components/cards/CardNews'
import Title from '../components/Title'
import Select from '../components/Select'
import Button from '../components/Button'
import NavBar from '../components/NavBar'
import BookOn from '../assest/icons/BookOn'
import { useState, useEffect, useRef, useCallback } from 'react'
import LoadingBar from '../components/LoadingBar'
import { Link, useNavigate } from "react-router-dom";
// import Article from './Article'

export default function Home()
{
  // const [news, setNews] = useState([]);
  // const [categories, setCategories] = useState()
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [sorting, setSorting] = useState('newest')
  const [searchResult, setSearchResult] = useState([])
  const [news, setNews] = useState([])
  const [sections, setSection] = useState([])
  const timeout = useRef()
  // const navigate = useNavigate()
  // const [newId, setId] = useState("")
  // console.log(category)
  // const url = 'https://content.guardianapis.com/'
  const getAllNews = async () =>
  {
    try 
    {
      setLoading(true)
      const result = await fetch(`${process.env.REACT_APP_API_URL}/news?page-size=8&api-key=${process.env.REACT_APP_API_KEY}&show-fields=all&order-by=${sorting}`);
      const allItems = await result.json();
      setNews(allItems.response.results)
      setLoading(false)
    } catch (error)
    {
      console.log(error)
      setLoading(false)

    }

  }
  const basedCategory = async () =>
  {
    try 
    {
      setLoading(true)
      const result = await fetch(`${process.env.REACT_APP_API_URL}search?section=sport&page-size=3&api-key=${process.env.REACT_APP_API_KEY}&show-fields=all&order-by=${sorting}`);
      const allItems = await result.json();
      setSection(allItems.response.results)
      // console.log(allItems)
      setLoading(false)
    } catch (error)
    {
      console.log(error)
      setLoading(false)

    }
  }
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
  const search = async (value) =>
  {
    try 
    {
      if (!value) return
      setSearchResult([]) 

      // clearTimeout(timeout.current);
      // timeout.current = setTimeout(async () =>
      // {
      // setLoading(true)
      const result = await fetch(`${process.env.REACT_APP_API_URL}search?q=${value}&page-size=5&api-key=${process.env.REACT_APP_API_KEY}&show-fields=all&orderBy=${sorting}	`);
        const allItems = await result.json();
        setSearchResult((prevNews) =>
        {
          return [...new Set([...prevNews, ...allItems.response.results])]
        })
      setSearchTerm(value)
        // setLoading(false)

      // }, 1000)
    } catch (error)
    {
      console.log(error)
      setLoading(false)

    }

  }
  const optimizeFn = useCallback(debounce(search), [])

  useEffect(() =>
  {
    getAllNews()
    // search()
    basedCategory()
  }, [sorting])
  const handleSorting = (e) =>
  {
    setSorting(e.target.value)
  }
  const handleSearch = (e) =>
  {
    setSearchTerm(optimizeFn(e.target.value))
  }
  // console.log(news)
  // const handleNaviegate = (id) =>
  // {
  //   setId(id)
  //   navigate(`/article/${id}`)
  //   console.log(id)

  // }
  const getSportSection = () =>
  {
    return (
      sections?.map((item) => (
        <div key={item.id}>
          <CardNews img={item?.fields?.thumbnail} content={item.fields.headline} body={item.fields.trailText} />
        </div>
      ))
    )
  }
  const getNews = () =>
  {
    return (
      news?.slice(0, 5).map((item) => (
        <div key={item.id}>
          {/* {console.log(item.id)} */}
          <Link to={`/${item.id}`} >
            <CardNews img={item?.fields.thumbnail} content={item.fields.headline} body={item.fields.trailText} /> </Link>
        </div>
      ))
    )
  }
  const getSearchResult = () =>
  {
    return (
      searchResult?.map((item) => (
        <div key={item.id}>
          <CardNews img={item?.fields?.thumbnail} content={item?.fields?.headline} body={item?.fields?.trailText} />
        </div>
      ))
    )
  }
  console.log(searchResult, searchTerm)
  return (
    <div >
      <NavBar search={searchTerm} handleChange={handleSearch} />
      <div className='container'>
        <div className='header-top' >
          <Title title="Top stories" />
          <div>
            <Link to="/bookmark"> <Button content={<>
              <BookOn />
              <span> view Bookmark </span>
            </>} /></Link>
            <Select onChange={handleSorting} orderby={sorting} />
          </div>
        </div>
        {loading ? <LoadingBar /> :
          <>
            {!searchTerm ?
              <div className='top-news'>
                {getNews()}
              </div > :
              <div className='section-2'>
                {/* <h2> Search Result: {searchTerm} </h2> */}
                {getSearchResult()}
              </div>
            }
            <div className="category">
              <h3> sports </h3>
              <div class="category-section">
                {getSportSection()}
              </div>
            </div>
          </>

        }
        {/* <Article id={newId} /> */}
      </div>

    </div>
  )
}
