
import { screen, render, waitFor } from '@testing-library/react'
import { getNews } from './api'
import Home from '../pages/Home'
import { BrowserRouter } from 'react-router-dom'
import { NewsData } from './data'
import { GlobalProvider } from '../context/GlobalState'

// jest.mock('./api')
describe('withFetch', () =>
{
  beforeEach(() =>
  {
    fetch.resetMocks()
  })
  it('should render results of news on top stories', () =>
  {

    fetch.mockResponseOnce(JSON.stringify(NewsData))
    getNews('newest').then((res) =>
    {
      expect(res.results).toHaveLength(8)
      expect(res.results[0].webTitle).toEqual('Corrections and clarifications')
    }).catch(error =>
    {
      expect(error.toBe(false))
    })
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`https://content.guardianapis.com/search?section=news&page-size=8&api-key=dd8810e2-f821-4334-a1a7-0c7aeb8b541d&show-fields=all&order-by=newest`);

  })
  it('should render error message when api fails', async () =>
  {
    fetch.mockReject(() => { });
    const handleSearch = jest.fn()
    render(
      <GlobalProvider value={handleSearch} >
        <Home />
      </GlobalProvider>
      , { wrapper: BrowserRouter })
    await waitFor(() =>
    {
      expect(screen.queryByTestId('sections-news')).toBeNull()
      screen.getByText('something went wrong')
    })
  })

})