import React from 'react'
import Header from '../../component/Header'
import Menu from '../../component/Menu'
import WhiteRectangle from '../../component/WhiteRectangle'
import Room from '../../component/Room'

export default function CheckRoom2() {
  return (
    <>
    <Header/>
    <Menu />
    <WhiteRectangle>
        <Room />
    </WhiteRectangle>
    </>
  )
}
