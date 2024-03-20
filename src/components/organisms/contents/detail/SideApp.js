import React from 'react'
import { Navigate } from 'react-router-dom'
import ChatApp from './sideApp/ChatApp';
import { ListApp } from './sideApp/ListApp';
import ReplyApp from './sideApp/ReplyApp';



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