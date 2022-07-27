import {FaArrowAltCircleLeft} from 'react-icons/fa'

import { Link } from 'react-router-dom'


const BackButton = ({url}) => {
// ^ prop of url

  return ( 
  <Link to={url} className='btn btn-reverse btn-back'>
  <FaArrowAltCircleLeft/> Back
  </Link>
  )
  // ^ here the <> need to be wrapped in parentheses

}

export default BackButton