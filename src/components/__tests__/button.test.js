import { render, screen, fireEvent } from '@testing-library/react'
import Button from './../Button'
import '@testing-library/jest-dom'
test('render button without crashing', () =>
{

  const onClick = jest.fn()
  render(<Button onClick={onClick} />)
  const buttonEl = screen.getByRole('button')
  fireEvent.click(buttonEl)
  expect(onClick).toHaveBeenCalled()

})