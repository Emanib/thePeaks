import { render, screen, fireEvent } from '@testing-library/react'
import Button from './../Button'
import '@testing-library/jest-dom'
test('render button without crashing', () =>
{

  const onClick = jest.fn()
  render(<Button onClick={onClick} content="view Bookmark" />)
  const buttonEl = screen.getByRole('button')
  fireEvent.click(buttonEl)
  expect(onClick).toHaveBeenCalled()
  const text = screen.getByText('view Bookmark')
  expect(text).toBeInTheDocument()

})