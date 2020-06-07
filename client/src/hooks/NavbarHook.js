const NavbarHook = (OriginalComponent) => {

  const WrappedComponent = (props) => {

    return (
      <div>
        <h4>Navbar hook component</h4>
        <OriginalComponent />
      </div>
    )
  }

  return WrappedComponent;
}

export default NavbarHook;