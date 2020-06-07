import {Checkbox} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const InputCheckbox = ({name, label, value, handleInputChange, color, ...restProps}) => {

  const onChange = (e) => {
    const {name, checked} = e.target;
    const data = {name, value: checked};
    handleInputChange(data);
  }

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={value}
          onChange={onChange}
          name={name}
          color={color}
        />
      }
      label={label}
      {...restProps}
    />
  )
}

export default InputCheckbox;