import React from 'react'
import { Navigate } from 'react-router-dom'
import ChatApp from './SideApp/ChatApp';
import { ListApp } from './SideApp/ListApp';
import ReplyApp from './SideApp/ReplyApp';



// const navigator = Navigate();


const SideApp = () => {
  return (
    <>
    <ChatApp></ChatApp>
    {/* <ListApp></ListApp> */}
    {/* <ReplyApp></ReplyApp> */}
    </>
  )
}

export default SideApp