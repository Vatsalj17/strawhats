import React from 'react'
import assets from '../assets/assets'
import Navbar from '../Components/Navbar'
import { useCurrentUser } from '../Context/CurrentUserContext'
import InfoCard from '../Components/InfoCard'
import { useNavigate } from 'react-router-dom'

const InstiuteDashboard = () => {
  const { currentUser } = useCurrentUser()
  const navigate = useNavigate()
  const submit = (academyId) => {
    navigate(`/${academyId}/submission`)
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${assets.s4})` }}
      />

      {/* Glassy Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Navbar */}
      <div className="relative z-10">
        <Navbar buttonName={'Home'} onButtonClick={() => navigate('/')}
          logo={assets.clogo}
          title={currentUser ? currentUser.name : 'Welcome'}
        />
      </div>

      {/* Centered Card Below Navbar */}
      <div className="relative z-10 flex justify-center items-start pt-48">
        <InfoCard
          image={assets.d5}
          title={'Submissions'}
          buttonName={'See now'}
          description={'Confirm the enrollment submissions'}
          onClick={() => submit(currentUser?._id)}
        />
      </div>
    </div>
  )
}

export default InstiuteDashboard
