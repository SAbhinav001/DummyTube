import React, { useEffect, useState } from 'react'

const X = () => {
  const [abc , setabc] = useState('nnn')

  useEffect(()=>{
    console.log("xxxxxx")
   
},[])


  return (
    

    <div>
      {
        console.log("inside div")
      }
        <h1>ABCEDEFGEDJHEVCBJHEVCEVCV</h1>
        <h1>{abc}</h1>
        <button onClick={()=>{setabc('bbbb')}}>CLICK me </button>

    </div>
  )
}

export default X