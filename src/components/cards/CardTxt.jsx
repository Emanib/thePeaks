import React from 'react'
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
export default function CardTxt({ webTitle,value}) {
  return (
   <div className="card-new-text">
      <div className="card-info">
        <h3 className="title">{webTitle}</h3>
      </div>
     <SectionsTypes value={ value} /> 
    </div>
  )
}
