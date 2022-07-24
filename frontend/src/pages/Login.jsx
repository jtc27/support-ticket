import { useState } from 'react'
import {toast} from 'react-toastify'
import { FaSignInAlt } from 'react-icons/fa'

//REDUX
import {useSelector, useDispatch} from 'react-redux'
import {login} from '../features/auth/authSlice'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  //REDUX allows us to dispatch
  const dispatch = useDispatch()

  //REDUX get the global state of state.auth
  const {user, isLoading, isSuccess, message} = useSelector((state) => state.auth)

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