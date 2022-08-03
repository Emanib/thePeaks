import LogoPeaks from '../assest/icons/Logo'
import Search from '../assest/icons/Search'
import { Link } from "react-router-dom";

export default function NavBar({ search, handleChange })
{
  return (
    <div className ="navbar">
      <div className="logo">
        <Link to ="/"><LogoPeaks /></Link> 
        <div className="search">
          <input type="text" className="search__input" placeholder='Search all news' value={search} onChange = {handleChange} />
          <button className="search__submit">
          <Search />
          </button>  
        </div>
     </div>
    </div>
  )
}
