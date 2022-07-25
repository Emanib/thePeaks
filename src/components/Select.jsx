
const Select = (props) =>
{
  const {onChange,orderby} = props
  return (
      <select
      value ={orderby}
      onChange = {onChange}
      className="select"
    >
        <option value ="newest"> newest </option>
        <option value ="oldest"> oldest </option>
      </select>
  );
};
export default Select;
