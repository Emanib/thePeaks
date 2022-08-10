export const getNews = (sorting) =>
{
  try 
  {
    // const result = await fetch(`${process.env.REACT_APP_API_URL}search?section=news&page-size=8&api-key=${process.env.REACT_APP_API_KEY}&show-fields=all&order-by=${sorting}`);
    return fetch(`${process.env.REACT_APP_API_URL}search?section=news&page-size=8&api-key=${process.env.REACT_APP_API_KEY}&show-fields=all&order-by=${sorting}`).then(res => res.json()).catch(error => console.log(error))
    // return await result.json();
    // console.log(await result.json())
  } catch (error)
  {
    console.log(error)
  }

}
export const getSection = async (sorting) =>
{
  try 
  {

    const result = await fetch(`${process.env.REACT_APP_API_URL}search?section=sport&page-size=3&api-key=${process.env.REACT_APP_API_KEY}&show-fields=all&order-by=${sorting}`);
    return await result.json();

  } catch (error)
  {
    console.log(error)

  }
}
export const getArticle = async (newId) =>
{
  try
  {
    const response = await fetch(`${process.env.REACT_APP_API_URL}${newId}?api-key=${process.env.REACT_APP_API_KEY}&show-fields=all&show-elements=all`)
    return await response.json();

  } catch (error)
  {
    console.log(error);

  }
}
export const getResultsSearch = async (pageNum, searchTerm, sorting) =>
{
  try
  {
    const result = await fetch(`${process.env.REACT_APP_API_URL}search?q=${searchTerm}&page=${pageNum}&page-size=15&api-key=${process.env.REACT_APP_API_KEY}&show-fields=all&order-by=${sorting}`);
    return await result.json();
  } catch (error)
  {
    console.log(error)
  }
}