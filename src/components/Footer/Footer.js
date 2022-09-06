import React from 'react'
import './styles.css';

const Footer = () => {
  
  let year = new Date().getFullYear();

  return (
    <div className="Footer">Build by Ronald Ⓒ {year}</div>
  )
}

export default Footer