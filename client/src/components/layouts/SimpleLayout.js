import SimpleNavbar from './../navbars/SimpleNavbar'

const SimpleLayout = ({children}) => {

  console.log(children)

  return (
    <div>
      <div className="header">
        <SimpleNavbar />
      </div>
      <div className="main-area">
        {children}
      </div>
      <div className="footer">
        {/* This is footer */}
      </div>
    </div>
  )
}

export default SimpleLayout;