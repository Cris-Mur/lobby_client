import React, {useState, useEffect} from 'react';
import { THEMES } from 'src/constants';
import useSettings from 'src/hooks/useSettings';


function Logo(props) {
  const settings = useSettings();
  const [imgr, setImg] = useState({ routeImg: "", altImg: "" })

  useEffect(() => {
    if (settings.settings.theme === THEMES.LIGHT) {
      setImg({
        routeImg: '/static/Lobbi_Dark.svg',
        altImg: 'Logo_Dark'
      })
    }
    else if (settings.settings.theme === THEMES.CORAL) {
      setImg({
        routeImg: '/static/Lobbi_Dark.svg',
        altImg: 'Logo_Dark'
      })
    }
    else {
      setImg({
        routeImg:'/static/Logo_Lobbi_White.svg',
        altImg:'Logo'
      })
    }
  }, [settings]);
  return (
    <img
      alt={imgr.altImg}
      src={imgr.routeImg}
      {...props}
    />
  );
}

export default Logo;
