import NavBar from './NavBar';
import Select from './Select';
import { useState, useCallback, useEffect } from 'react';
import CardNews from './cards/CardNews';
import Footer from './Footer';
import LoadingBar from './LoadingBar'
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sorting, setSorting] = useState('newest');
  const [searchResult, setSearchResult] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };
  const handleSorting = (e) => {
    setSorting(e.target.value);
  };
   const isScrolling = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
   document.documentElement.scrollHeight ) {
          setHasNextPage(true);
    }
  };
  const loadMore = async () =>
  {
      try 
    {
      // setLoading(true)
      const result = await fetch(`${process.env.REACT_APP_API_URL}search?q=${searchTerm}page=${pageNum}&page-size=3&api-key=${process.env.REACT_APP_API_KEY}&show-fields=all&order-by=${sorting}`);
      const allItems = await result.json();
      setSearchResult( prev=> [...prev, ...allItems.response.results])
        setPageNum(prev => prev + 1)
        setHasNextPage(false)
      // setLoading(false)
    } catch (error)
    {
      console.log(error)
      setLoading(false)

    }
  }
  const search = async (value) => {
    try {
      if (!value) return;
      setSearchResult([]);
      setLoading(true)
      const result = await fetch(
        `${process.env.REACT_APP_API_URL}search?q=${value}&page=${pageNum}&page-size=15&api-key=${process.env.REACT_APP_API_KEY}&show-fields=all&order-by=${sorting}`
      );
      const allItems = await result.json();
      setSearchResult((prevNews) => {
        return [...new Set([...prevNews, ...allItems.response.results])];
      });
      // setPageNum(prev => prev + 1)
       setHasNextPage(allItems.response.results.length > 0) ;

      setLoading(false);
      setSearchTerm(value);
       window.addEventListener("scroll", isScrolling);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const optimizeFn = useCallback(debounce(search), [sorting]);

  const handleSearch = (e) => {
    setSearchTerm(optimizeFn(e.target.value));
    setPageNum(1)
  };
  useEffect(() =>
  {
    if (hasNextPage)
    {
      loadMore()
  }
  }, [hasNextPage])
  
  useEffect(() => {
    search();
  }, [sorting, pageNum]);
  const getSearchResult = () => {
    return (
      <>
        <div className='container'>
          <div className='header'>
            <h1>Search Results</h1>
            <Select orderby={sorting} onChange={handleSorting} />
          </div>
          <div className='search-grid'>
            {searchResult?.map((item, index) => {
         
              return (
                <div key={index}>
                  <Link to={`/${item.id}`} > <CardNews
                    img={item?.fields?.thumbnail}
                    webTitle={item.webTitle}
                    headline={item.fields.headline}
                  />
                    </Link> 
                </div>
              );
            })}
          </div>
        </div>
        {hasNextPage &&
          <div className='center-loading'>
            <LoadingBar />
          </div>}
        <Footer />
      </>
    );
  };

  return (
    <>
      <NavBar search={searchTerm} handleChange={handleSearch} />
      <div>{!searchTerm ? children : getSearchResult()}</div>
    </>
  );
}
