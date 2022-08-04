import LogoPeaks from '../assest/icons/Logo'
import Search from '../assest/icons/Search'
import { Link } from "react-router-dom";
import {GlobalContext } from '../context/GlobalState'
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

export default function NavBar()
{
  const { searchTerm, handleSearch } = useContext(GlobalContext)
  const navigate = useNavigate()
  useEffect(() =>
  {

    if (searchTerm)
    {
      navigate('/search')
    }
    else
    {
      navigate('/')
    }

  }, [searchTerm]) // eslint-disable-line react-hooks/exhaustive-deps
  const debounce = () =>
  {
    let timer;
    return function (...args)
    {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() =>
      {
        timer = null;
        handleSearch(...args)
      }, 500);
    };
  };
  const optimizeFn = debounce();
  return (
    <div className ="navbar">
      <div className="logo">
        <Link to ="/"><LogoPeaks /></Link> 
        <div className="search">
          <input type="text" className="search__input" placeholder='Search all news'  onChange={(e)=> optimizeFn(e.target.value) } />
          <button className="search__submit">
          <Search />
          </button>  
        </div>
     </div>
    </div>
  )
}
