import React from 'react'
import Header from '../../component/Header'
import AdminBar from '../../component/AdminBar'
import WhiteRectangle from '../../component/WhiteRectangle'
import StatusBar from '../../component/statusBar'
import Status from '../../component/Status'
import StatusAdmin from './StatusAdmin'
export default function AdmindReservation() {
  return (
    <>
    <Header />
    <AdminBar />
    <WhiteRectangle >
        {/* <StatusBar /> */}
        <StatusAdmin/>

    </WhiteRectangle>
    </>
  )
}
