import { useState, useEffect, useRef, useContext } from "react"
import { useParams } from "react-router-dom"
import LoadingBar from '../components/LoadingBar'
import SnakBar from '../components/SnakBar'
import Button from '../components/Button'
import { GlobalContext } from "../context/GlobalState";
import BookOn from '../assest/icons/BookOn'
import { getArticle } from '../api/api'
export default function Article()
{
  const [loading, setLoading] = useState(true)
  const [article, setArticle] = useState([])
  const [isInBookList, setIsInBookList] = useState(false)
  const { bookMarkList, addArticleToBookList, removeArticleFromBookList } = useContext(GlobalContext)
  const parmas = useParams()
  let newId = parmas['*']

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

  const displayArticle = async () =>
  {
    try
    {

      const data = await getArticle(newId)
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
    displayArticle()
  }, [loading, parmas.id]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="container">
      {loading ?
        <div className='center-loading'>
          <LoadingBar />
        </div>
        : (
          <div className="wrapper-article">
            <Button onClick={handleSave} content={
              <>
              <BookOn />
              <span> {isInBookList ? "Remove Bookmark" : "Add Bookmark"}</span>
            </>} /> 
            <div className="information">
              <p>
                {article.webPublicationDate} </p>
            </div>
            <div className="article-headline">
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
            <SnakBar type={isInBookList ? "success" : "fail"} isInBookList={isInBookList} ref={snakRef} />
        </div>
      )
      }

    </div>
  )
}
