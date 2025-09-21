import React from 'react'
import { useCurrentUser } from '../Context/CurrentUserContext'
import Navbar from '../Components/Navbar'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import InfoCard from '../Components/InfoCard'

const PlayerDashboard = () => {
    const { currentUser } = useCurrentUser()
    const navigate = useNavigate()
    const aca = (id) => {
        navigate(`/${id}/academies`)
    }
    const sub = (playerId) => {
        navigate(`/${playerId}/report`)
    }

    return (
        <div className="min-h-screen relative">
            {/* Background image */}
            <div 
                className="absolute inset-0 bg-cover bg-center -z-20"
                style={{ backgroundImage: `url(${assets.s4})` }}
            />

            {/* Subtle glassy overlay */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-md -z-10"></div>

            {/* Navbar */}
            <Navbar 
                title={currentUser ? `Welcome ${currentUser.name}` : ''}  
                logo={assets.clogo}  
                buttonName={'Home'} 
                onButtonClick={() => navigate('/')}
            />

            {/* Card Section - Placed below Navbar */}
            <div className="relative z-10 px-6 pt-40 pb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <InfoCard buttonName={'Scan now'}
                    image={assets.d2} 
                    title={'Junior AI assistant'} 
                    description={'Check your fitness here'} 
                    onClick={() => navigate('/fitness')} 
                />
                <InfoCard 
                    image={assets.d4}  buttonName={'See now'}
                    title={'Your submissions'} 
                    description={'your own fitness document for admissions in Academy'} 
                    onClick={() => navigate(`/${currentUser?._id}/report`)} 
                />
                <InfoCard 
                    image={assets.d3} buttonName={'Go Girls'}
                    title={'Girls\' academies'} 
                    description={'Post your fitness check here'} 
                    onClick={() => navigate('/girls')} 
                />
                <InfoCard 
                    image={assets.d5} buttonName={'search'}
                    title={'Visit Academies'} 
                    description={'Explore academies and apply'} 
                    onClick={() =>aca(currentUser?._id)} 
                />
            </div>
        </div>
    )
}

export default PlayerDashboard
