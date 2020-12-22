import Link from "next/link";
import { Dropdown } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { RiUserLine, RiSettings3Line, RiLogoutBoxRLine } from "react-icons/ri";
import {authService} from '../../services'

const navLinks = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Engineering",
    url: "/engineering",
  },
  {
    title: "Subject",
    url: "/subject",
  },
  {
    title: "About",
    url: "/about",
  },
];

const MainHeader = () => {
  const auth = useSelector(state => state.Auth, shallowEqual);
  const {loggedInStatus, loggedInUser: {uid, uuid, username, first_name, last_name}} = auth;

  const handleLogout = () => {
    authService.logout()
      .then(response => {
        window.location.reload()
      }).catch(error => {
        console.log(error);
      })
  }

  return (
    <div className="top-header">
      <div className="container1">
        <input type="checkbox" name="" id="check" />
        <div className="logo-container">
          <h3 className="logo">
            Brand<span>Name</span>
          </h3>
        </div>
        <div className="nav-btn">
          <div className="nav-links">
            <ul>
              {navLinks.map((navLink, index) => {
                return (
                  <li className="nav-link" style={{ "--i": ".6s" }} key={index}>
                    <Link href={navLink.url} passHref>
                      {navLink.title}
                    </Link>
                  </li>
                );
              })}
              {
                (loggedInStatus && uid)
                ?
                (
                <li className="nav-link" style={{ "--i": "1.35s" }}>
                  <div className="icon bootstrap-dropdown-style profile-nav-img">
                    <Dropdown>
                      <Dropdown.Toggle>
                        <img src="https://www.w3schools.com/howto/img_avatar.png" width="30" />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href={`/profile/${username}`}><span className="dropdown-item-icon"><RiUserLine /></span> {`${first_name} ${last_name}`}</Dropdown.Item>
                        <Dropdown.Item href="/profile/settings"><span className="dropdown-item-icon"><RiSettings3Line /></span> Settings</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleLogout()}><span className="dropdown-item-icon"><RiLogoutBoxRLine /></span> Logout</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </li>
                )
                :
                <li className="nav-link" style={{ "--i": ".6s" }}>
                  <Link href="/login" passHref>
                    Login
                  </Link>
                </li>
              }
            </ul>
          </div>
        </div>
        <div className="hamburger-menu-container">
          <div className="hamburger-menu">
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
