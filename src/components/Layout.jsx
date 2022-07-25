import NavBar from "./NavBar"
import { useState, useEffect, useRef } from 'react'

export default function Layout({ children })
{
   const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [sorting, setSorting] = useState('newest')
  const [searchResult, setSearchResult] = useState([])
  const handleSearch = (e) =>
  {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="container-layout"> 
    <NavBar search={searchTerm} handleChange={handleSearch} /> 
    </div>
  )
}
