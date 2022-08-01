import { useState, useEffect, useRef, useContext } from "react"
import { useParams } from "react-router-dom"
import LoadingBar from '../components/LoadingBar'
import SnakBar from '../components/SnakBar'
import Button from '../components/Button'
import { GlobalContext } from "../context/GlobalState";
import BookOn from '../assest/icons/BookOn'

export default function Article()
{
  const [loading, setLoading] = useState(true)
  const [article, setArticle] = useState([])
  const [isInBookList, setIsInBookList] = useState(false)
  const { bookMarkList, addArticleToBookList, removeArticleFromBookList } = useContext(GlobalContext)
  const parmas = useParams()
  let newId = parmas['*']
  const typeSnak = {
    success: "success",
    fail: "fail"
  }
  const snakRef = useRef()


  const handleSave = () =>
  {
    if (isInBookList)
    {
      removeArticleFromBookList(newId)
      snakRef.current.show()
    } else
    {
      addArticleToBookList(article)
      snakRef.current.show()

    }
  }
  useEffect(() =>
  {
    // save the value of state add/remove
    const articleFind = bookMarkList.find((item) => item.id === newId)
    if (articleFind)
    {
      setIsInBookList(true)
    } else
    {
      setIsInBookList(false)
    }
  }, [article, bookMarkList, newId])

  const getArticle = async () =>
  {
    try
    {
      const response = await fetch(`${process.env.REACT_APP_API_URL}${newId}?api-key=${process.env.REACT_APP_API_KEY}&show-fields=all&show-elements=all`)
      const data = await response.json();
      setArticle(data.response.content);
      setLoading(false);
    } catch (error)
    {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() =>
  {
    getArticle()
  }, [loading, parmas.id]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="container">
      {/* <NavBar /> */}

      {loading ?
        <div className='center-loading'>
          <LoadingBar />
        </div>
        : (
          <div className="wrapper-article">
            <Button onClick={handleSave} content={<>
              <BookOn />
              <span> {isInBookList ? "Remove Bookmark" : "Add Bookmark"}</span>
            </>} /> 
            <div className="information">
              <p>
                {article.webPublicationDate} </p>
            </div>

            <div class="article-headline">
              <h1> {article?.fields?.headline} </h1>
              <h5 dangerouslySetInnerHTML={{ __html: article.fields.trailText }} ></h5>
              <div className="line"></div> 
            </div>
            <div className="article-body">
              <article className="article-txt" dangerouslySetInnerHTML={{ __html: article.fields.body }} ></article>
              <div className="article-img">
                {article?.fields?.thumbnail ? <img src={article?.fields?.thumbnail} alt="article" /> : null}
              </div> 
            </div>

            {isInBookList ? <SnakBar type={typeSnak.success} message="Saved to BookMarks" ref={snakRef} /> :
              <SnakBar type={typeSnak.fail} message="Remove from BookMarks" ref={snakRef} />
            }
        </div>
      )
      }

    </div>
  )
}
