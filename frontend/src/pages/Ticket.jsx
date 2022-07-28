import {useSelector, useDispatch} from 'react-redux'
import {getTicket, reset, closeTicket} from '../features/tickets/ticketSlice'
import { useParams, useNavigate } from 'react-router-dom'

import { toast, Toast } from 'react-toastify'

import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useEffect } from 'react'

function Ticket() {

  const {ticket, isLoading, isSuccess, isError, message} = useSelector((state) => state.tickets)

  const params = useParams() //to get the ticket id from the URL

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {ticketId} = useParams()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

     dispatch(getTicket(ticketId))
     // eslint-disable-next-line
  }, [isError, message, ticketId])

  //close Ticket function
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId))
    toast.success('Ticket Closed')
    navigate('/tickets')
  }


  if (isLoading) {
    return <Spinner/>
  }

  if (isError) {
    return <h3>Something went wrong</h3>
  }

  return (
    <div className='ticket-page'>
      <header className='ticker-header'>
        <BackButton url='/tickets'/>
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>

      <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
      <h3>Product: {ticket.product}</h3>
      <hr/>

      <div className='ticket-desc'>
       <h3>Description of Issue</h3>
        <p>{ticket.description}</p>
      </div>

      </header>

      {/* Show the 'close ticket' button only if ticket is still open */}
      {ticket.status !== 'closed' && 
      (<button onClick={onTicketClose} className='btn btn-block btn-danger'>Close Ticket</button>) 
      }
    </div>
  )
}

export default Ticket