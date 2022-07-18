import React from 'react'

export default function Button({type,color,content}) {
  return (
    <button type= {type} className = {`btn-${color}`}> {content} </button>
  )
}
