import "./../../assets/styles/components/Button/Basic.module.css";
const BasicButton = ({ className, title, onClick, ...restProps }) => {
  return (
    <button className={className} onClick={onClick} {...restProps}>
      {title}
    </button>
  );
};

export default BasicButton;
