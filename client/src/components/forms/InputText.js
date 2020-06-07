import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    marginBottom: '15px'
  },
});

const InputText = ({error, handleInputChange, ...restProps}) => {

  const onChange = (e) => {
    const {name, value} = e.target;
    const data = {name, value};
    handleInputChange(data);
  }

  const classes = useStyles();

  return (
    <TextField 
      className={classes.root}
      {...restProps}
      error={!!error}
      helperText={error ? error : ''}
      onChange={onChange}
      fullWidth
      />
  )
}

export default InputText;