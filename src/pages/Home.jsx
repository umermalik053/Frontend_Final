import React from 'react'
import Navbar from '../component/Navbar'
import { useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'

const Home = () => {
  const selector = useSelector((store)=>store.auth.user)
  return (
    <div className='p-9 mt-16'>
      <Navbar />
      <h1>Welcome to the Home Page</h1>
      <p>This is the Home Page of our website.</p>
      <p>Feel free to explore the other pages or contact us for any further assistance.</p>
      <p>Enjoy your visit!</p>
      <p>Made with React by Umar Malik</p>
    </div>
  )
}

export default Home
