import { useContext } from "react"
import { GlobalContext } from '../context/GlobalState'
import NavBar from '../components/NavBar'
import CardNews from '../components/cards/CardNews'

export default function BookMark()
{
  const { bookMarkList } = useContext(GlobalContext)
  console.log(bookMarkList)
  return (
    <div>
      <NavBar />
      <div className="container">
        <h1> All BookMarks</h1>
        <div className="cards-bookmark">
          {bookMarkList.map((item) => (
            <CardNews key={item.id} img={item?.fields.thumbnail} content={item?.fields.headline} body={item?.fields.trailText} />
          ))}
        </div>
      </div>
    </div>
  )
}
