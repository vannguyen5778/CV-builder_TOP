import React from 'react'
import logo from "../assets/images/logo.png"
import '../assets/styles/SideBar.css'
function SideBar() {
  return (
    <div className="side-bar-ctn">
        <div className="logo"><img src={logo} alt="" /></div>
        <ul>
            <li>
                <div className="circle active"></div>
                <p  className="bold">Personal Details</p>
            </li>
            <li>
                <div className="circle"></div>
                <p>Experience</p>
            </li>
            <li>
                <div className="circle"></div>
                <p>Projects</p>
            </li>
            <li>
                <div className="circle"></div>
                <p>Education</p>
            </li>
            <li>
                <div className="circle"></div>
                <p>Skills</p>
            </li>
            <li>
                <div className="circle last"></div>
                <p>Others</p>
            </li>
        </ul>
    </div>
  )
}

export default SideBar