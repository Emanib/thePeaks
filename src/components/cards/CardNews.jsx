
export default function CardNews({img,content})
{
  const cardStyle = {
    backgroundImage: `url(${img})`,
    display: "flex",
    flexDirection:"column",
    alignItems: "center",
    width: "350px",
    height: "300px",
    justifyContent: "flex-end",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover", 
    boxShadow: "hsl(242deg 88% 66% / 58%) 0px 2px 6px",
  }
  return (
    <div style={cardStyle} >
      <div className="background-content">
         <div className="content">
        Transfer rumours: Aubameyang, Sancho, Sane, Alaba, Gerrard
        </div>
      </div>
    </div>
  )
}
