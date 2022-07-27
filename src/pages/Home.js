
import CardNews from '../components/cards/CardNews'
import Title from '../components/Title'
import Select from '../components/Select'
import Button from '../components/Button'
import NavBar from '../components/NavBar'
import BookOn from '../assest/icons/BookOn'
import { useState, useEffect, useRef, useCallback } from 'react'
import LoadingBar from '../components/LoadingBar'
import { Link } from "react-router-dom";
// import Article from './Article'

export default function Home()
{

  const [loading, setLoading] = useState(false)
  const [sorting, setSorting] = useState('newest')
  const [news, setNews] = useState([])
  const [sections, setSection] = useState([])
  // const navigate = useNavigate()
  // const [newId, setId] = useState("")
  // console.log(category)
  // const url = 'https://content.guardianapis.com/'

  const getAllNews = async () =>
  {
    try 
    {
      setLoading(true)
      const result = await fetch(`${process.env.REACT_APP_API_URL}search?section =news&page-size=15&api-key=${process.env.REACT_APP_API_KEY}&show-fields=all&order-by=${sorting}`);
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
      setLoading(false)
    } catch (error)
    {
      console.log(error)
      setLoading(false)

    }
  }

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

  const getSportSection = () =>
  {
    return (
      sections?.map((item) => (
        <div key={item.id}>
          <Link to={`/${item.id}`}>
            <CardNews
              img={item?.fields?.thumbnail}
              webTitle={item.webTitle}
              headline={item.fields.headline}
              value={item?.sectionId} />
          </Link> 
        </div>
      ))
    )
  }
  const getNews = () =>
  {
    return (
      news?.slice(0, 5).map((item) => (
        <div key={item.id}>
          <Link to={`/${item.id}`} >
            <CardNews
              img={item?.fields.thumbnail}
              webTitle={item.webTitle}
              headline={item.fields.headline}
              value={item.sectionId}
            />
          </Link>
        </div>
      ))
    )
  }
  const getSectionNews = () =>
  {
    return (
      news.slice(5, 8).map((item) => (
        <div key={item.id}>
          <Link to={`/${item.id}`} >
            <CardNews img={item?.fields.thumbnail}
              webTitle={item.webTitle}
              headline={item.fields.headline}
            />
          </Link>
        </div>
      ))
    )
  }

  return (
    <div >
      {/* <NavBar search={searchTerm} handleChange={handleSearch} /> */}
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
        {loading ?
          <div className='center-loading'>
            <LoadingBar />
          </div>
          :
          <>
            <div className='top-news'>
                {getNews()}
            </div >
            <div className='category-section'>
              {getSectionNews()}
            </div>
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
