'use client' 
import {useState}from 'react'

export default function Statastics() {
  const [inputValue, setInputValue] = useState('');
  const handleSubmit=(e)=>{
    e.preventDefault();
  }
  return (
    <>
     <form onChange={handleSubmit}>
      <label htmlFor="">test</label>
      <input type="text" className='border mx-5 my-3' onChange={e =>setInputValue(e.target.value)} value={inputValue}/>
      <button type='submit'>submit</button>
     </form>
     <div className="">
      <p>{inputValue}</p>
     </div>

    </>
  )
}
