import React, { useState } from 'react'

const TodoPage = () => {
  const [input, setinput] = useState("")
  const [requirement, setrequirement] = useState(["none", "high", "medium", "low"])
  return (
    <div className='flex justify-center  bg-[#bebebe] h-screen'>
      <div>
        <div className='w-125  pl-3 flex mt-5  justify-between rounded-3xl border-2 border-blue-600'>
          <input value={input} onChange={(e) => setinput(e.target.value)} type="text" placeholder='Enter your tasks...' className='outline-none w-full mr-1' />
          <button className='py-2 px-5 bg-blue-300 hover:bg-blue-500 duration-75 cursor-pointer hover:text-white rounded-full'>Add</button>

        </div>
        <select name="" id="" onChange={(e) => console.log(e.target.value)}>

          {requirement.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default TodoPage