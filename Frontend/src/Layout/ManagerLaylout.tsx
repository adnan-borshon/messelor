import ManagerNavbar from '@/Components/Manager/ManagerNavbar'
import Footer from '@/FixedComponents/Footer'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function ManagerLaylout() {
  return (
      <>
      <ManagerNavbar/>
      <Outlet/>
      <Footer/>
      </>
  )
}
