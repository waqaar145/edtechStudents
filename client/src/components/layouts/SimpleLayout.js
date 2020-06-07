import SimpleNavbar from './../navbars/SimpleNavbar'

const SimpleLayout = ({children}) => {

  return (
    <div>
      <SimpleNavbar />
      <div>
        {children}
      </div>
    </div>
  )
}

export default SimpleLayout;