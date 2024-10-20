import React from 'react'
import farmer from '../animation/farmer.json'
import Lottie from 'lottie-react'
import { Link } from 'react-router-dom'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import AgricultureIcon from '@mui/icons-material/Agriculture'
const Home = () => {
  return (
    <div className="homemain">
      <div className="right">
        <Lottie className="anime" animationData={farmer} loop={true} />
      </div>
      <div className="left">
        <h2>Organic,</h2>
        <h2>Sustainable,</h2>
        <h2>and fresh</h2>
        <div className="buttons">
          <Link to="/buyer">
            Buyer
            <LocalMallIcon className="icon" />
          </Link>
          <Link to="/farmer">
            Farmer
            <AgricultureIcon className="icon" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
