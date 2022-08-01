
import peak from '../../assest/imgs/peak.svg'
export default function CardNews({ img, webTitle, headline, value })
{
  const cardStyle = {
    backgroundImage: `url(${img})`,
        // height: "350px",

  }
  const cardFake = {
    backgroundColor: "#0D47A1",
               
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
    <div className={img ? 'card-news' : 'card'}
      style={img ? cardStyle : cardFake}
      // style = {{ backgroundImage: `url(${peak})`}}
      data-testid='card-1'  >
           {!img  && (
        <div className="peaksBack">
          <img src={peak} alt={headline} />
        </div>
      )}
      <div className="card-info">
        <h3 className='title'> {webTitle} </h3>
          {/* <p> {headline} </p> */}
      </div>
       <SectionsTypes value ={value} />
    </div>
  )
}
