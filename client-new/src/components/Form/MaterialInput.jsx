import './../../assets/styles/components/Form/MaterialInput.module.css';
const MaterialInput = ({id, type, name, value, placeholder, onChange, error, ...restProps}) => {
  return (
    <>
      <input 
        id={id}
        type={type} 
        name={name} 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...restProps}
        />
      {error && <span className="input-error">{error}</span>}
    </>
  )
}

export default MaterialInput;