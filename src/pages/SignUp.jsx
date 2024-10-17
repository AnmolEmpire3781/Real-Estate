import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import OAuth from '../components/OAuth';
export default function SignUp() {
  const [formData,setFormData] = useState({});
  const [passwordVisible,setPasswordVisible] = useState(false);
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false)

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    })
  }
  const handleSubmit= async (e)=>{
    e.preventDefault();
    setLoading(true);
    try{
      const res = await fetch("/api/auth/signup",{
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify(formData),
      })
      const data = await res.json();
      
      if(data.success === false){ 
        setError(data.message);
        setLoading(false)
      }else{
        setLoading(false)
        setError(null)
        navigate('/sign-in');
      }
    }catch(err){
      setLoading(false)
      setError(err.message)
    }
    
    
  }
  const navigate = useNavigate();
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type = "text" placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChange}/>
        <input type = "email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>

        <div className="mb-4 flex">

          <input type = {passwordVisible ? "text" : "password"} placeholder='password' className='border p-3 rounded-lg w-full' id='password' onChange=  {handleChange}/>
          <span className="flex justify-around items-center" onClick={togglePasswordVisibility}>
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>


        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? "LOADING..." : "SIGN UP"}</button>
        <OAuth></OAuth>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account ?</p>
        <span className='text-blue-700 cursor-pointer' onClick={()=>{
          navigate("/sign-in")
        }}>Sign in</span>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}

    </div>
  )
}
