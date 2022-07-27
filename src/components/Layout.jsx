import NavBar from './NavBar';
import Select from './Select';
import { useState, useCallback, useEffect, useRef } from 'react';
import CardNews from './cards/CardNews';
import Footer from './Footer';
export default function Layout({ children }) {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sorting, setSorting] = useState('newest');
  const [searchResult, setSearchResult] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const intObserver = useRef();
  const mountedRef = useRef(true);
  const lastPostRef = useCallback(
    (post) => {
      if (loading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((articles) => {
        if (articles[0].isIntersecting && hasNextPage) {
          console.log('We are near the last articles!');
          setPageNum((prev) => prev + 1);
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [loading, hasNextPage]
  );
  const handleReset = useCallback(async () => {
    setSearchTerm('');
  }, [mountedRef]);

  useEffect(() => {
    handleReset();
    return () => {
      mountedRef.current = false;
    };
  }, [handleReset]);
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
  const search = async (value) => {
    try {
      if (!value) return;
      setSearchResult([]);

      const result = await fetch(
        `${process.env.REACT_APP_API_URL}search?q=${value}&page=${pageNum}&page-size=15&api-key=${process.env.REACT_APP_API_KEY}&show-fields=all&order-by=${sorting}`
      );
      const allItems = await result.json();
      setSearchResult((prevNews) => {
        return [...new Set([...prevNews, ...allItems.response.results])];
      });
      setHasNextPage(Boolean(searchResult.length));
      setLoading(false);
      setSearchTerm(value);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const optimizeFn = useCallback(debounce(search), [sorting]);

  const handleSearch = (e) => {
    setSearchTerm(optimizeFn(e.target.value));
  };

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
              if (searchResult.length === index + 1) {
                return (
                  <div key={item.id} ref={lastPostRef}>
                    <CardNews
                      img={item?.fields?.thumbnail}
                      webTitle={item.webTitle}
                      headline={item.fields.headline}
                    />
                  </div>
                );
              }
              return (
                <div key={item.id}>
                  <CardNews
                    img={item?.fields?.thumbnail}
                    webTitle={item.webTitle}
                    headline={item.fields.headline}
                  />
                </div>
              );
            })}
          </div>
        </div>
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
