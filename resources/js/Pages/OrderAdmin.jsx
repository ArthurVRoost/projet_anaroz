import Footer from '@/Components/Footer'
import NavAdmin from '@/Components/NavAdmin'
import React from 'react'
import '../../css/orderadmin.css'
export default function OrderAdmin({bannerImage}) {
  return (
    <div>
        <NavAdmin/>
        <div className="carouDetailsnav">
            <div className="div1details" style={{ marginLeft: '15%' }}>
            <h2 className="detailsH1">Orders Settings</h2>
            <p className="detailsP">Aranoz - Shop System</p>
            </div>
            <div className="div2details">
            <img className="detailsCarouImg" src={bannerImage} alt="" />
            </div>
        </div>
        <Footer/>
    </div>
  )
}
