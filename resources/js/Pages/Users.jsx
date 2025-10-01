import React from 'react'
import '../../css/admin.css'
export default function Users({bannerImage}) {
  return (
    <div>
        <div className="carouDetailsnav">
            <div className="div1details " style={{ marginLeft: '15%' }}>
            <h2 className="detailsH1">Categories Settings</h2>
            <p className="detailsP">Aranoz - Shop System</p>
            </div>
            <div className="div2details">
            <img className="detailsCarouImg" src={bannerImage} alt="" />
            </div>
        </div>
    </div>
  )
}
