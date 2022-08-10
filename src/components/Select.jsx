
const Select = (props) =>
{
  const { onChange, orderby } = props
      const options = [{ name: "newest", id: 1 }, { name: " oldest", id: 2 }]

  return (
      <select
      value ={orderby}
      onChange={onChange}
        data-testid="select"
      className="select"
    >
      {options.map((item) => (
        <option key ={item.id} value= {item.name}  data-testid="select-option" > {item.name}  </option>

      ))}
      {/* <option value="oldest"  > oldest</option> */}
      {/* <option defaultValue ="default"> default </option> */}
      </select>
  );
};
export default Select;
