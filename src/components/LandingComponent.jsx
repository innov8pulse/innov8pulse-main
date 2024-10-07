import React from "react";
import { useState } from 'react'
import viteLogo from '/vite.svg'
// import Login from "../Pages/Login";
import LogoWhite from "../assets/logo-white-bg.png"
import "../index.css"
import "../App.css"

export default function LandingComponent() {
    return (
        <>
        <div className='Hero'>
          <div className='Left-Content'>
          <img src={LogoWhite} className="innovLogo" />
            <div className='Headers'>
              <div className='Hero-Heading'>
                <h1 className='title'>welcome to innov8Pulse.</h1>
                <div className='Hero-Heading-2'>
                  <p className='subtitle'>where innovation meets action
                  <br></br>and ideas come to life</p>
                </div>
              </div>
            </div>
          </div>
          <div className='Right-Content'>
            <div className='Vid-Container'>
            </div>
          </div>
        </div>
        </>
      )
}