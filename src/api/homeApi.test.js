
import { screen, render, waitFor } from '@testing-library/react'
import * as api from './api'
import Home from '../pages/Home'
import { BrowserRouter } from 'react-router-dom'
import { Data } from './data'
jest.mock('./api')

describe('test api calls in home without crashing', () =>
{
  beforeEach(() => jest.clearAllMocks())
  it('should render results of news on top stories', async () =>
  {
    api.getNews.mockResolvedValue(Data)
    //  know the length of the results 
    render(<Home />, { wrapper: BrowserRouter })
    const dataApi = await api.getNews()
    expect(dataApi.results.length).toEqual(8)
    expect(dataApi.results[0].webTitle).toEqual('Corrections and clarifications')
    await waitFor(() =>
    {
      screen.queryByTestId('sections-news')
    })
  })

  it('should render error message when api fails', async () =>
  {
    api.getNews.mockRejectedValue({})
    render(<Home />, { wrapper: BrowserRouter })
    await waitFor(() =>
    {
      screen.getByText('something went wrong')
    })
  })

})