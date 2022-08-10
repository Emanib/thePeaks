import { render, screen, fireEvent } from '@testing-library/react'
import Select from '../../components/Select'

describe('test select input changes correctly', () =>
{

  render(<Select />)
  it('should display correct number of options', () =>
  {
    expect(screen.getAllByRole('option').length).toBe(2)
    expect(screen.getAllByText('newest')).toBeDefined()
    expect(screen.getByRole('option', { name: "newest" }).selected).toBe(true)

  })
  it('should allow user sort articles', () =>
  {
    render(<Select />)
    const selectEl = screen.getByTestId('select')
    const testvalue = "newest"
    fireEvent.change(selectEl, { target: { value: testvalue } })
    let options = screen.getAllByTestId("select-option")
    expect(options[0].selected).toBeTruthy()
    expect(options[1].selected).toBeFalsy()

  })

})