import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import useElementHeightCalc from "../../hooks/useElementHeightCalc";
import TextField from "@material-ui/core/TextField";
// import styles from './_style/commentSection.module.css'

const CommentSection = () => {
  const { height } = useElementHeightCalc();

  const el = document.getElementById("internal-subject-link-tab1");

  const [commentHeaderHeight, setCommentHeaderHeight] = useState(null);
  useEffect(() => {
    const el = document.getElementsByClassName("header")[0];
    setCommentHeaderHeight(el.offsetHeight);
  }, []);

  const useStyles = makeStyles((theme) => {
    return {
      root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        paddingTop: "5px",
        paddingRight: "10px",
        paddingLeft: "10px",
        marginBottom: "30px",
        height: `calc(90vh - ${commentHeaderHeight}px - ${height}px - 3px)`,
        position: "relative",
        overflowY: "scroll",
        marginBottom: "10px",
        "&::-webkit-scrollbar": {
          width: "0.1em",
        },
        "&::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,.1)",
          outline: "1px solid slategrey",
          borderRadius: "10px",
        },
      },
      commentTextarea: {
        marginTop: "10px",
        position: "fixed",
        width: "100%",
        marginRight: "10px",
        bottom: "5px",
        backgroundColor: "red",
        padding: "10px",
        backgroundColor: theme.palette.background.default,
      },
    };
  });

  const classes = useStyles();

  const [value, setValue] = React.useState("Controlled");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={classes.root}>
      asdf
      <br />
      <br />
      <div className={classes.commentTextarea}>
        <input type="text" />
      </div>
    </div>
  );
};

export default CommentSection;
