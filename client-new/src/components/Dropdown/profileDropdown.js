import './profileDropdown.module.css'
const ProfileDropdown = ({title}) => {
  return (
    <div className="ed-dropdown">
      <div className="header">
        {title}
      </div>
      <div className="body">
        <div className="body-element">
          this is first link
        </div>
        <div className="body-element">
          this is first link
        </div>
        <div className="body-element">
          this is first link
        </div>
        <div className="body-element">
          this is first link
        </div><div className="body-element">
          this is first link
        </div>
      </div>
    </div>
  )
}

export default ProfileDropdown;