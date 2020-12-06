import Link from 'next/link';

const MainHeader = () => {
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
              <li className="nav-link" style={{ "--i": ".6s" }}>
                <a href="#">Home</a>
              </li>
              <li className="nav-link" style={{ "--i": ".85s" }}>
                <Link href="/engineering" passHref>
                  Engineering
                </Link>
              </li>
              <li className="nav-link" style={{ "--i": "1.1s" }}>
                <a href="#">
                  Services<i className="fas fa-caret-down"></i>
                </a>
              </li>
              <li className="nav-link" style={{ "--i": "1.35s" }}>
                <a href="#">About</a>
              </li>
            </ul>
          </div>
          <div style={{ "--i": "1.8s" }}>
            <li><a href="#" className="btn transparent">
              Log in
            </a></li>
            {/* <a href="#" className="btn solid">
              Sign up
            </a> */}
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
