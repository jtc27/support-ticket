import { useState, useEffect } from 'react'
import {toast} from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

//REDUX
import {useSelector, useDispatch} from 'react-redux'
import {register, reset} from '../features/auth/authSlice'

import Spinner from '../components/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

  //REDUX HOOK dispatch our actions such as register. '../features/auth/authSlice'
  const dispatch = useDispatch()

  //REDUX HOOK useSelector, get the state.auth from global state
  const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth) //in authSlice.js it is named 'auth'

  //Redirect
  const navigate = useNavigate()

  //RESETS THE STATE TO DEFAULT
  useEffect(() => {
    if(isError) {
      toast.error(message)  //message will be set in Redux, we got it with useSelector
    }

    //Redirect if successful login
    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])

  //changes the name/email/password fields in the formData
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      
      //IF passwords match and all fields are written...
      const userData = {
        name,
        email,
        password,
      }

      //DISPATCHES the register function from authSlice.js
      dispatch(register(userData))
    }
  }

  if(isLoading) {
    return <Spinner/>
  }

return (
  <>
    <section className="heading">
      <h1><FaUser /> Register </h1>
      <p>Please create an account</p>
    </section>

    <section className="form">
      <form onSubmit={onSubmit}>

        <div className="form-group">
          <input 
          type="text" 
          className="form-control" 
          id='name' 
          value={name} //value from state
          name='name'  //funct onChange [e.target.name] will find this
          onChange={onChange} 
          placeholder='Enter your name' 
          required //requires this before submission
          />
        </div>

        <div className="form-group">
          <input 
          type="email" 
          className="form-control" 
          id='email' 
          value={email} //value from state
          name='email' 
          onChange={onChange} 
          placeholder='Enter your email'
          required />
        </div>

        <div className="form-group">
          <input 
          type="password" 
          className="form-control" 
          id='password' 
          value={password} //value from state
          name='password' 
          onChange={onChange} 
          placeholder='Enter your password' 
          required />
        </div>

        <div className="form-group">
          <input 
          type="password" 
          className="form-control" 
          id='password2' 
          value={password2} //value from state
          name='password2' 
          onChange={onChange} 
          placeholder='Confirm your password'
          required />
        </div>

        <div className="form-group">
          <button className="btn btn-block">Submit</button>
        </div> 

      </form>
    </section>
  </>
)
}

export default Register