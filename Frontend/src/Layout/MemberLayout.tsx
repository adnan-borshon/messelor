import Footer from '@/FixedComponents/Footer'
import MainNavbar from '@/FixedComponents/MainNavbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function MemberLayout() {
  return (
    <>
    <MainNavbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}
