export const getNews = async (sorting) =>
{
  console.log(sorting)
  try 
  {
    const result = await fetch(`${process.env.REACT_APP_API_URL}search?section=news&page-size=15&api-key=${process.env.REACT_APP_API_KEY}&show-fields=all&order-by=${sorting}`);
    return await result.json();
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