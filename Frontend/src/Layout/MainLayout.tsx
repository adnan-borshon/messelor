import React from 'react'
import MainNavbar from '@/FixedComponents/MainNavbar'
import Footer from '@/FixedComponents/Footer'
import { Outlet } from 'react-router-dom'


function MainLayout() {
  return (
     <>
    <MainNavbar />
  
  <Outlet />
  
  <Footer />
    </>
  )
}

export default MainLayout