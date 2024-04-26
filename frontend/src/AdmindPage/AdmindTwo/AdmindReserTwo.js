import React from 'react'
import Header from '../../component/Header'
import AdminBar2 from '../../component/AdminBar2'
import StatusAdminTwo from './StatusAdminTwo'
import WhiteRectangle from '../../component/WhiteRectangle'
export default function AdmindReserTwo() {
  return (
    <>
    <Header />
    <AdminBar2 />
    <WhiteRectangle >
        {/* <StatusBar /> */}
        <StatusAdminTwo/>

    </WhiteRectangle>
    </>
  )
}
