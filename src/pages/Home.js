import imag1 from '../assest/imgs/1.png'
import imag2 from '../assest/imgs/2.png'
import imag3 from '../assest/imgs/3.png'


import CardNews from '../components/cards/CardNews'
const data = [
  {
    content: "Transfer rumours: Aubameyang, Sancho, Sane, Alaba, Gerrard",
    img: imag1
  },
  {
    content: "Ferrari announce technical department restructure after slow start to season",
    img: imag2
  },
  {
    content: "Harold Varner matches Justin Rose and strikes blow for equality on return",
    img: imag3
  }

]
export default function Home()
{
  return (
    <div>
      {data.map((item, index) => (
        <CardNews img={item.img} content={item.content} key={index} />
      ))}
    </div>
  )
}
