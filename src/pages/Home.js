import CardTxt from '../components/cards/CardTxt'
import CardNews from '../components/cards/CardNews'
import Title from '../components/Title'
import Select from '../components/Select'
import Button from '../components/Button'
import BookOn from '../assest/icons/BookOn'
import { useState, useEffect, useContext } from 'react'
import LoadingBar from '../components/LoadingBar'
import { Link } from "react-router-dom";
import { getNews, getSection } from '../api/api'
import { GlobalContext } from '../context/GlobalState'

export default function Home()
{
  const { handleSearch } = useContext(GlobalContext)
  const [loading, setLoading] = useState(false)
  const [sorting, setSorting] = useState('newest')
  const [news, setNews] = useState([])
  const [sections, setSection] = useState([])
  const [error, setError] = useState('')
  // const [newId, setId] = useState("")

  const getAllNews = async () =>
  {
    try 
    {

      setLoading(true)
      getNews(sorting).then((res) =>
        setNews(res.response.results)
      )
      // setNews(allItems.response.results)
      setLoading(false)
    } catch (error)
    {
      setLoading(false)
      setError(error)

    }

  }
  const basedCategory = async () =>
  {
    try 
    {
      setLoading(true)
      const allItems = await getSection(sorting)
      setSection(allItems.response.results)
      setLoading(false)
    } catch (error)
    {
      setError(error)
      setLoading(false)

    }
  }

  useEffect(() =>
  {
    handleSearch("")
    getAllNews()
    basedCategory()
  }, [sorting]) // eslint-disable-line react-hooks/exhaustive-deps
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
  const getNewsFirstElement = () =>
  {
    return (
      news?.slice(0, 1).map((item) => (
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
  const getNewsSecond = () =>
  {
    return (
      news?.slice(1, 3).map((item) => (
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
      {/* <Layout />  */}
      <div className='container'>
        <div className='header-top' >
          <Title title="Top stories" />
          <div >
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
            <>
              <div className="grid_wrap">
                <div className="grid">
                  <section className="grid_wrap first-grid">
                    <div className="grid" >
                      {getNewsFirstElement()}
                    </div>
                  </section>
                  <section className="grid_wrap second-grid">
                    <div className="grid"  >
                      {getNewsSecond()}
                      {news?.slice(3, 5).map((item) => (
                        <div key={item.id}>
                          <Link to={`/${item.id}`} >
                            <CardTxt
                              value={item.sectionId}
                              webTitle={item.webTitle}
                            />
                          </Link>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </>
            <div className='grid_wrap' data-testid='sections-news'  >
              <div className='grid'>
                {getSectionNews()}

              </div>
            </div>
            <div className="category">
              <h3> sports </h3>
              <div className="grid_wrap">
                <div className='grid'>
                  {getSportSection()}

                </div>
              </div>
            </div>
          </>

        }
        {error && <div> something went wrong </div>}
        {/* <Article id={newId} /> */}
      </div>

    </div>
  )
}
