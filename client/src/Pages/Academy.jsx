import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import InfoCard from '../Components/InfoCard'
import assets from '../assets/assets'
import Navbar from '../Components/Navbar'

const Academy = () => {
  const [academy, setAcademy] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  const getAca = (acaId) => {
    navigate(`/academy/${acaId}`)
  }

  useEffect(() => {
    setLoading(true)

    const fetchAcademy = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/academy/matchingAcademy/${id}`
        )
        setAcademy(res.data.academies)
      } catch (error) {
        setMessage(error?.message || 'Could not found Academies')
      } finally {
        setLoading(false)
      }
    }
    fetchAcademy()
  }, [id])

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${assets.s1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      {/* Glass overlay (lighter blur) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(6px)',
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar
          title={'Academies for you'}
          logo={assets.clogo}
          buttonName={'Home'}
          onButtonClick={() => navigate('/')}
        />

        {/* Add padding so content is below navbar */}
        <div style={{ paddingTop: '20vh' }}>
          {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
          {message && <p style={{ textAlign: 'center' }}>{message}</p>}

          {academy.length > 0 ? (
            <ul
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
                padding: '20px',
              }}
            >
              {academy.map((aca) => (
                <li key={aca._id}>
                  <InfoCard
                    image={aca.docs.image}
                    title={aca.name}
                    description={aca.sports.join(',')}
                    onClick={() => getAca(aca._id)}
                    buttonName={'Enroll here'}
                  />
                </li>
              ))}
            </ul>
          ) : (
            !loading && (
              <p style={{ textAlign: 'center' }}>No matching academies found.</p>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default Academy
