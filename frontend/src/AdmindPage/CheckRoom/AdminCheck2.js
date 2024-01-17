import React from 'react'
import Header from '../../component/Header'
import AdminBar from '../../component/AdminBar'
import WhiteRectangle from '../../component/WhiteRectangle'
import Room from '../../component/Room'

export default function AdminCheck2() {
  return (
    <>
    <Header/>
    <AdminBar />
    <WhiteRectangle>
        <Room />
    </WhiteRectangle>
    </>
  )
}
