
import { screen, render } from '@testing-library/react'
import CardNews from './../cards/CardNews'
import peak from '../../assest/imgs/peak.svg'

test('testcard news', () =>
{
  const prop = { img: peak, headline: "hi" }
  render(<CardNews prop={prop} />)
  const cardElement = screen.getByTestId('card-1')
  expect(cardElement).toBeInTheDocument()
})