import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #409eff 30%, #409eff 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 1px 1px 1px rgba(255, 105, 135, .2)',
    color: 'white',
    padding: '5px 15px',
    marginTop: '5px',
    marginBottom: '5px',
  },
});

const CustomButton = ({name, variant, color, small, ...restProps}) => {

  const classes = useStyles();

  return (
    <Button 
      className={classes.root}
      variant={variant} 
      color={color}
      size={small}
      {...restProps}
      >
      {name}
    </Button>
  )
}

export default CustomButton;