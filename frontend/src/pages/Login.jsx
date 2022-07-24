import { useState, useEffect } from 'react'
import {toast} from 'react-toastify'
import { FaSignInAlt } from 'react-icons/fa'

//REDUX
import {useSelector, useDispatch} from 'react-redux'
import {login, reset} from '../features/auth/authSlice'

import { useNavigate } from 'react-router-dom'

import Spinner from '../components/Spinner'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  //REDUX allows us to dispatch
  const dispatch = useDispatch()

  //REDUX get the global state of state.auth
  const {user, isLoading, isError, isSuccess, message}  = useSelector((state) => state.auth)

  const navigate = useNavigate()

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

    const userData = {
      email,
      password
    }
    dispatch(login(userData))
  }

  if(isLoading) { return <Spinner/> }


return (
  <>
    <section className="heading">
      <h1><FaSignInAlt /> Login</h1>
      <p>Please log in to get support</p>
    </section>

    <section className="form">
      <form onSubmit={onSubmit}>


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
          <button className="btn btn-block">Submit</button>
        </div> 

      </form>
    </section>
  </>
)
}

export default Login