import React from 'react'
import styles from "./ImageDropDown.module.css";

const ImageDropDown = ({icons, setIcon, selectedIcon}) => {


  return (
    <div>
        {icons.map(icon => (
            <img 
            name="icon" 
            value={`http://localhost:5000/assets/icons/${icon}`} 
            onClick={()=>setIcon(`/assets/icons/${icon}`)} 
            key={icon} 
            src={`http://localhost:5000/assets/icons/${icon}`}
            className={`${styles.icon} ${selectedIcon === `/assets/icons/${icon}` ? `${styles.selected}` : ``}`}
            ></img>
        ))}
    </div>
  )
}

export default ImageDropDown;