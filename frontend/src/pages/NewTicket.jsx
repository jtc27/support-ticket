import {useState, useEffect} from 'react'
//local state with fields in the form

import {useSelector, useDispatch} from 'react-redux'
//get user from global state

import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

import {createTicket, reset} from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function NewTicket() {

  const {user} = useSelector((state) => state.auth)
  const {isLoading, isError, isSuccess, message} = useSelector((state) => state.tickets)
  // get the ticket state

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name] = useState(user.name)
  const [email] = useState(user.email)
  // ^ setName and setEmail not needed because we won't change these
  const [product, setProduct] = useState('iPhone') 
  // ^ it can't be empty string because this is an enum in BACKEND/.../ticketModel.js.  one option must be chosen
  const [description, setDescription] = useState('')

  useEffect(()=>{
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      dispatch(reset())
      navigate('/tickets')  //resets state and goes to the /tickets website
    }

    dispatch(reset())
  }, [dispatch, isError, isSuccess, navigate, message]) // dependencies

  if (isLoading) {
    return <Spinner/>
  }

  const onSubmit = (e) => {
    e.preventDefault()

    //submit button dispatches the createTicket function
    dispatch(createTicket({product, description}))
  }

  return (
    <>
    <BackButton url='/' />
    <section className='heading'>
      <h1>Create a New Ticket</h1>
      <p>Please fill out the form below</p>
    </section>

    <section className='form'>
      <div className='form-group'>
        <label htmlFor="name">Name</label>
        <input type="text" 
        className='form-control'
        value={name}  //name from the global state, found with useSelector
        disabled
        />
      </div>
      <div className='form-group'>
        <label htmlFor="email">Email</label>
        <input type="text" 
        className='form-control'
        value={email} //email from the global state, found with useSelector
        disabled
        />
      </div>
      {/* The above items are disabled.  The next 2 items can be submitted */}
      
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor="product">Product</label>
          <select name="product" 
          id="product" 
          value="product" 
          onChange={(e) => setProduct(e.target.value)}> {/* onChange, setProduct to the option value selected from below */}
            <option value="iPhone">iPhone</option>
            <option value="Macbook Pro">Macbook Pro</option>
            <option value="iMac">iMac</option>
            <option value="iPad">iPad</option>
          </select>
        </div>

        <div className='form-group'>
          <label htmlFor="description">Describe your issue</label>
           <textarea name="description"
          id="description" 
          className='form-control'
          placeholder='Type in here'
          value={description}
          onChange = {(e) => setDescription(e.target.value)}
          >
          </textarea>
        </div>

        <div className="form-group">
          <button className="btn btn-block">Submit</button>
        </div>

      </form>

    </section>
    </>
  )
}

export default NewTicket