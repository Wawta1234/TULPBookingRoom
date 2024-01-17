import React from 'react'
import Header from '../../component/Header'
import AdminBar from '../../component/AdminBar'
import WhiteRectangle from '../../component/WhiteRectangle'
import StatusBar from '../../component/statusBar'
import Status from '../../component/Status'

export default function AdmindReservationWait() {
  return (
    <>
    <Header />
    <AdminBar />
    <WhiteRectangle >
        <StatusBar />
        <Status/>

    </WhiteRectangle>
    </>
  )
}
