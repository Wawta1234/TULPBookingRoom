import React from 'react'
import Header from '../../component/Header'
import AdminBar2 from '../../component/AdminBar2'
import Status from '../../component/Status'
import StatusBar from '../../component/statusBar'
import WhiteRectangle from '../../component/WhiteRectangle'
export default function AdmindReserTwo() {
  return (
    <>
    <Header />
    <AdminBar2 />
    <WhiteRectangle >
        {/* <StatusBar /> */}
        <Status />

    </WhiteRectangle>
    </>
  )
}
