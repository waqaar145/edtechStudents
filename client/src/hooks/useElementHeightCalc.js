import {useState, useEffect} from 'react';

const useElementHeightCalc = () => {
  const [height, setHeight] = useState(null);
  useEffect(() => {
    const el = document.getElementsByClassName('header')[0];
    setHeight(el.offsetHeight);
  }, []);

  return {
    height
  }
}

export default useElementHeightCalc;