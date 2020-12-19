import './EmptyText.module.css'
const EmptyStateText = ({text, subText, image, width}) => {
  return (
    <div className="empty-state-text-wrapper">
      {image && <img src={image} width={width ? width : '100%'}/>}
      {text && <div className="main-text">{text}</div>}
      {subText && <div className="sub-text">{subText}</div>}
    </div>
  )
} 

export default EmptyStateText;