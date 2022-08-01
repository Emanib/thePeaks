import { useContext, useEffect, useState } from "react"
import { GlobalContext } from '../context/GlobalState'
import Select from '../components/Select'
import CardNews from '../components/cards/CardNews'
import { Link } from "react-router-dom";

export default function BookMark()
{
  const { bookMarkList } = useContext(GlobalContext)
  const [sorting, setSorting] = useState("newest")
  const [filterArticles, setFilterArticles] = useState(bookMarkList)

  const FilterArticles = () =>
  {

    let newData = [...bookMarkList]
    sorting === "newest" ? newData.sort((a, b) => new Date(b.webPublicationDate) - new Date(a.webPublicationDate)) :
      newData.sort((a, b) => new Date(a.webPublicationDate) - new Date(b.webPublicationDate))
    setFilterArticles(newData)

  }
  useEffect(() =>
  {


    FilterArticles()
  }, [sorting])  // eslint-disable-line react-hooks/exhaustive-deps

  const handleSorting = (e) =>
  {
    setSorting(e.target.value)
  }
  return (
    <div>
      {/* <NavBar /> */}
      <div className="container">
        <div className="header">
          <h1> All BookMarks</h1>
          <Select value={sorting} onChange={handleSorting} />
        </div>
        <div className="cards-bookmark">
          {filterArticles.map((item) => (
            <Link to={`/${item.id}`} key={item.id} >
              <CardNews img={item?.fields.thumbnail}
                webTitle={item.webTitle}
                headline={item.fields.headline}
                value={item.sectionId} />
            </Link>

          ))}
        </div>
      </div>
    </div>
  )
}
