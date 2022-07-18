import LogoPeaks from '../assest/icons/Logo'
import Search from '../assest/icons/Search'
export default function NavBar() {
  return (
    <div className ="navbar">
      <div className="logo">
        <LogoPeaks />
        <div className="search">
          <input type="text" className="search__input" placeholder='Search all news' />
          <button className="search__submit">
          <Search />
          </button>  
        </div>
     </div>
    </div>
  )
}
