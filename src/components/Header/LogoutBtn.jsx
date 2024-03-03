/* eslint-disable no-unused-vars */
import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
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
    className=' w-full inline-block px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-500 border border-transparent  active:bg-red-600 hover:bg-red-600 focus:outline-none focus:shadow-outline-red'
     onClick={logoutHandler}>
    Logout
    </button>
    
  )
}

export default LogoutBtn
