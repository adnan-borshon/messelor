import React from 'react'
import Navbar from '@/FixedComponents/Navbar'
import Footer from '@/FixedComponents/Footer'
import { Outlet } from 'react-router-dom'


function MainLayout() {
  return (
     <>
    <Navbar />
  
  <Outlet />
  
  <Footer />
    </>
  )
}

export default MainLayout