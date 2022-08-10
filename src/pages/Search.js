// import NavBar from '../components/NavBar';
import Select from '../components/Select';
import { useState, useEffect } from 'react';
import CardNews from '../components/cards/CardNews';
import { Link } from "react-router-dom";
import { getResultsSearch } from '../api/api'
import { GlobalContext } from '../context/GlobalState'
import { useContext } from "react"
import LoadingBar from '../components/LoadingBar';

export default function Layout()
{
  const [loading, setLoading] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const { sorting, handleSorting, searchTerm } = useContext(GlobalContext)
  const isScrolling = () =>
  {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight)
    {
      setHasNextPage(true);
    }
  };
  const loadMore = async () =>
  {
    try 
    {
      // setLoading(true)
      const result = await fetch(`${process.env.REACT_APP_API_URL}search?q=${searchTerm}page=${pageNum}&page-size=15&api-key=${process.env.REACT_APP_API_KEY}&show-fields=all&order-by=${sorting}`);
      const allItems = await result.json();
      setSearchResult(prev => [...prev, ...allItems.response.results])
      setPageNum(prev => prev + 1)
      setHasNextPage(false)
      setLoading(false)
    } catch (error)
    {
      console.log(error)
      setLoading(false)

    }
  }
  const search = async () =>
  {

    if (!searchTerm) return;
    setSearchResult([])
    setLoading(true)
    const allItems = await getResultsSearch(pageNum, searchTerm, sorting)
    setHasNextPage(allItems?.response?.results?.length > 0);
    setLoading(false);
    window.addEventListener("scroll", isScrolling);

  };

  useEffect(() =>
  {
    if (hasNextPage)
    {
      loadMore()
    }
  }, [hasNextPage]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() =>
  {
    search();
  }, [sorting, searchTerm]);// eslint-disable-line react-hooks/exhaustive-deps

  const getSearchResult = () =>
  {
    return (
      <>
        <div className='container'>
          <div className='header'>
            <h1>Search Results</h1>
            <Select orderby={sorting} onChange={handleSorting} />
          </div>
          <div className='grid_wrap'>
            <div className='grid-search'>
              {loading ?
                <div className='center-loading'>
                  <LoadingBar />
                </div> :
                searchResult.length > 0 ? searchResult.map((item, index) =>
                {
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
                }) : <div > No Results on this query </div>
              }
            </div>
          </div>
        </div>

        {/* <Footer /> */}
      </>
    );
  };

  return (
    <div>
      {getSearchResult()}
    </div>
  );
}
