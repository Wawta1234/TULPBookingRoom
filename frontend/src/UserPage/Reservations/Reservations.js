import React from 'react'
import Header from '../../component/Header'
import Menu from '../../component/Menu'
import WhiteRectangle from '../../component/WhiteRectangle'
import Status from '../../component/Status'
import StatusBar from '../../component/statusBar'
export default function Reservations() {
  //1 = อนุมัติ
  //0 = ไม่อนุญาติ
  //2 = รอการอนุมัติ
  return (
    <>
    <Header />
    <Menu />
    <WhiteRectangle >
        {/* <StatusBar /> */}
        <Status/>

    </WhiteRectangle>
    </>
  )
}
