import AdminNavbar from '@/Components/Admin/AdminNavbar'
import Footer from '@/FixedComponents/Footer'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <>
    <AdminNavbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}
