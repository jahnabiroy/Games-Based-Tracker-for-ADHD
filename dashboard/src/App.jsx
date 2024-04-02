import { useState } from 'react'
import React from 'react'
import adhd from './assets/adhd.webp'
import Navbar from './navbar'

function App() {
  return (
    <>
      <Navbar />
      <div className='container-fluid' style={{backgroundImage: `url(${adhd})`}}>
        <h1 className='text-white text-center' style={{fontSize:`15rem`, textShadow: `2px 2px 4px #000`}}>ADHD</h1>
      </div>
    </>
  )
}

export default App
