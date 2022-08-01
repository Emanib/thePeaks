
import { screen, render, cleanup } from '@testing-library/react'
import CardNews from './../cards/CardNews'
import peak from '../../assest/imgs/peak.svg'
beforeEach(() =>
{
  cleanup()
})

test('testcard news', () =>
{
  const prop = { img: peak, headline: "hi" }
  render(<CardNews prop={prop} />)
  const cardElement = screen.getByTestId('card-1')
  expect(cardElement).toBeInTheDocument()
  // expect(cardElement).toHaveStyle(`background-image:url(${prop.img})`)
  expect(cardElement).toHaveClass('card')
})