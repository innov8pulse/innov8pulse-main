import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import './App.css'

function App() {

  return (
    <>
    {/* <div className='logo-header'>
      <div>
        <div>
          <div>
            <div>
              <img src="assets/logo-white.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div> */}
    <div className='Hero'>
      <div className='Left-Content'>
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

export default App
