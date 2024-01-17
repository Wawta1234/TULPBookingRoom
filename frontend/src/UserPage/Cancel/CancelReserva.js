import React from 'react'

import Header from '../../component/Header'
import Menu from '../../component/Menu'
import WhiteRectangle from '../../component/WhiteRectangle'
import Status from '../../component/Status'
import StatusBar from '../../component/statusBar'
export default function CancelReserva() {
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
