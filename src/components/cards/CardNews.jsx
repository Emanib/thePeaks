
import peak from '../../assest/imgs/peak.svg'
export default function CardNews({ img, webTitle, headline, value })
{
  const cardStyle = {
    backgroundImage: `url(${img})`,
    display: "flex",
    flexDirection:"column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover", 
    objectFit:"cover",
    boxShadow: "hsl(242deg 88% 66% / 58%) 0px 2px 6px",
  }
  const cardFake = {
    backgroundImage: `url(${peak})`,
    backgroundColor:"#0D47A1",
     display: "flex",
    flexDirection:"column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    backgroundRepeat: "no-repeat",
    // backgroundSize: "cover", 
    // objectFit:"cover",
    boxShadow: "hsl(242deg 88% 66% / 58%) 0px 2px 6px",
               
}
    const SectionsTypes = ({ value }) =>
  {
    switch (value)
    {
      case "sport": return <div className='sport-red'></div>;
      case "culture": return <div className='culture-yellow'></div>
      case "lifestyle": return <div className='life-blue'></div>
      default: return <div className='news-green'></div>

    }
  }
  return (
    <div style={ img? cardStyle :cardFake  } >
      <div className="background-content">
        <div className="content">
          <p> {webTitle}</p>
        </div>
      </div>
       <SectionsTypes value ={value} />
    </div>
  )
}
