import React from 'react'

const AboutHero = () => {
  return (
    <div className="w-screen h-full flex md:justify-around lg:justify-around md:flex-row lg:flex-row flex-col p-2.5 pt-24 pb-48 shadow-md">
       <div className="flex p-6 flex-col bg-white bg-opacity-75">
        <h2 className="text-7xl text-gray-800 font-bold">About</h2>
      <h2 className="text-7xl text-indigo-600 font-bold">Doze</h2>
       </div>
        <div className="flex justify-center items-center md:w-1/4 lg:w-1/4 w-full">
        <h2 className="text-2xl text-gray-800 px-6  text-center">Your personal task manager for achieving your goals</h2>
        </div>
    </div>
  )
}

export default AboutHero
