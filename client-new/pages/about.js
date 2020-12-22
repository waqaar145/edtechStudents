import axios from "axios";
import { connect, useSelector } from "react-redux";
import { users } from "./../src/store/auth/auth.selector";
import UsersList from './../src/components/usersList'
import MainHeader from './../src/components/navbar/mainHeader'

const About = (props) => {
  const usersData = useSelector(users);

  const handleChange = (e) => {
    const { name, value } = e.target;
    props.firstNameHandler({ name, value });
  };
  return (
    <>
      <MainHeader />
      About page - test - this is a test {props.id}
      <input name="first_name" onChange={handleChange} value={props.id} />
      <UsersList usersData={usersData}/>
    </>
  );
};

About.getInitialProps = async ({ store }) => {
  try {
    let result = await axios.get("https://jsonplaceholder.typicode.com/todos");
    await store.dispatch({ type: "SET_USERS", data: result.data });
  } catch (error) {
    console.log(error);
  } finally {
    return {};
  }
};

function mapState(state) {
  return {
    id: state.Auth.first_name,
  };
}

function mapDispatch(dispatch) {
  return {
    firstNameHandler: (data) => dispatch({ type: "FIRST_NAME_HANDLER", data }),
  };
}

export default connect(mapState, mapDispatch)(About);
