import { useState } from 'react'
import {toast} from 'react-toastify'
import { FaUser } from 'react-icons/fa'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

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
    }
  }

return (
  <>
    <section className="heading">
      <h1><FaUser /> Register</h1>
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