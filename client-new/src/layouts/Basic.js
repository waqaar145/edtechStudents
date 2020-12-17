import Navbar from "../components/Navbar/mainHeader";
import "./basic.css";

const BasicLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <br />
      <br />
      <br />
      <div className="basic-layout-css">{children}</div>
    </>
  );
};

export default BasicLayout;
