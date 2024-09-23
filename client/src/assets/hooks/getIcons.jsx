import React, { useState, useEffect } from 'react'

const useIcons = () => {
  const [icons, setIcons] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchIcons = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/icons");
        if(!response.ok){
          throw new Error(`http error! ${response.status}`);
        }
        const data = await response.json();
        setIcons(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchIcons();
  },[]);

  return {icons,loading,error};
}

export default useIcons;