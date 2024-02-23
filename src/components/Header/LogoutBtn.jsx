/* eslint-disable no-unused-vars */
import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/config'
import { logout } from '../../store/authSlice'

function LogoutBtn() {

    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(()=> dispatch(logout()
        )).catch((error) => {
            console.error(error)
        })
    }

  return (

    <button
    className='inline-block px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-red'
     onClick={logoutHandler}>
    Logout
    </button>
    
  )
}

export default LogoutBtn
