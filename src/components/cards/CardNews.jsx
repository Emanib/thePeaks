
export default function CardNews({img,content,body})
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
  const cardTextStyle = {
    color: "pink",
  }
  return (
    <div style={img? cardStyle: cardTextStyle} >
      <div className="background-content">
        <div className="content">
          
          <h5>  {content}</h5>
           <p> {body} </p>

        </div>
      </div>
    </div>
  )
}
