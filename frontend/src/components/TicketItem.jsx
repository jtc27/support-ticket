import {Link} from 'react-router-dom'

const TicketItem = ({ticket}) =>{
  return (
    <div className='ticket'>
      <div>{new Date(ticket.createdAt).toLocaleString('en-US')}</div>
      <div>{ticket.product}</div>
      <div className={`status status-${ticket.status}`}>
        {ticket.status}       {/* Dynamic className, different colors based on ticket status */}
      </div>
      <Link to={`/ticket/${ticket._id}`} className='btn btn-reverse btn-sm'>
        View
      </Link>
    </div>
  )
}

export default TicketItem