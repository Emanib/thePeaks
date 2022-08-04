import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from './../NavBar';
import { BrowserRouter } from 'react-router-dom'
describe('search component', () =>
{
  render(<Navbar />, { wrapper: BrowserRouter })
  const searchInput = screen.getByPlaceholderText(/Search all news/i)
  test('render searchbox in navbar', async () =>
  {
    expect(searchInput).toBeInTheDocument()

  })

  test('input should change the value', async () =>
  {
    const testvalue = "test"
    fireEvent.change(searchInput, { target: { value: testvalue } })
  })
})

