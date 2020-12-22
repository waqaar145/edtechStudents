import './../../assets/styles/components/Button/Basic.module.css';
const BasicButton = ({ title, onClick, ...restProps }) => {
  return <button 
          className="primary-btn"
          onClick={onClick}
          {...restProps}
          >
            {title}
        </button>;
};

export default BasicButton;
