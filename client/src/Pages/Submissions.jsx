import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import assets from '../assets/assets'
import Navbar from '../Components/Navbar'

const Submissions = () => {
  const [reports, setReports] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [mailedReports, setMailedReports] = useState([])
  
  const navigate = useNavigate()
  const { academyId } = useParams()

  // Fetch reports
  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true)
      try {
        const res = await axios.get(
          `http://localhost:5000/api/reports/${academyId}/report`
        )
        // backend returns {message, reports}
        setReports(Array.isArray(res.data.reports) ? res.data.reports : [res.data.reports])
      } catch (error) {
        setMessage(error?.response?.data?.message || 'Error fetching reports')
      } finally {
        setLoading(false)
      }
    }
    fetchReports()
  }, [academyId])

  // Update report status
  const updateStatus = async (id, status) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/reports/${id}/status`,
        { status }
      )
      setMessage(res.data.message)
      setReports(prev =>
        prev.map(r => (r._id === id ? { ...r, status: res.data.report.status } : r))
      )
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Error updating status')
    }
  }

  // Send mail
  const sendMail = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/mail/${id}/send-mail`,
        {
          subject: "Your Report Status",
          message: "Please check your updated report status."
        }
      )
      setMessage(res.data.message)
       setMailedReports(prev => [...prev, id])
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Error sending mail')
    }
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'from-green-300/80 to-emerald-400/80 text-green-800';
      case 'rejected':
        return 'from-red-300/80 to-rose-400/80 text-red-800';
      default:
        return 'from-yellow-300/80 to-amber-400/80 text-yellow-800';
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${assets.s1})`,
        }}
      />
      
      {/* Light Magenta Glassmorphism Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-pink-200/20 via-purple-200/15 to-fuchsia-300/25 backdrop-blur-sm" />
      
      {/* Subtle Floating Effects */}
      <div className="fixed top-32 left-16 w-40 h-40 bg-gradient-to-r from-pink-200/20 to-purple-300/20 rounded-full blur-2xl animate-pulse" />
      <div className="fixed bottom-32 right-16 w-56 h-56 bg-gradient-to-r from-purple-200/15 to-fuchsia-300/15 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="fixed top-1/3 right-1/4 w-28 h-28 bg-gradient-to-r from-fuchsia-200/25 to-pink-300/25 rounded-full blur-xl animate-pulse delay-500" />

      {/* Navbar */}
      <Navbar 
        logo={assets.clogo} 
        title={'Verification'} 
        buttonName={'Home'} 
        onButtonClick={() => navigate('/')} 
      />

      {/* Main Content */}
      <div className="relative z-10 pt-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
              Reports
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-pink-300 to-purple-400 mx-auto rounded-full" />
          </div>

          {/* Status Messages */}
          {loading && (
            <div className="mb-6 p-4 backdrop-blur-lg bg-white/15 border border-white/30 rounded-2xl shadow-xl text-center">
              <p className="text-white font-medium">Loading...</p>
            </div>
          )}

          {/* {message && (
            <div className="mb-6 p-4 backdrop-blur-lg bg-white/15 border border-white/30 rounded-2xl shadow-xl">
              <p className="text-white text-center font-medium">{message}</p>
            </div>
          )} */}

          {!loading && reports.length === 0 && (
            <div className="text-center p-8 backdrop-blur-lg bg-white/15 border border-white/30 rounded-2xl shadow-xl">
              <p className="text-white text-lg font-medium">No reports found</p>
            </div>
          )}

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map(report => (
              <div key={report._id} className="backdrop-blur-lg bg-white/15 border border-white/30 rounded-2xl shadow-xl p-6 hover:bg-white/20 transition-all duration-300">
                {/* Header with Name and Status */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white truncate">{report.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                </div>

                {/* Profile Image */}
                {report.image && (
                  <div className="mb-4 flex justify-center">
                    <img 
                      src={report.image} 
                      alt="Profile" 
                      className="w-16 h-16 rounded-full border-2 border-white/40 shadow-lg object-cover"
                    />
                  </div>
                )}

                {/* Report Details */}
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-pink-100 font-medium">Sports:</span>
                    <span className="text-white text-right flex-1 ml-2 truncate">
                      {Array.isArray(report.sports) ? report.sports.join(', ') : report.sports}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-pink-100 text-xs">Weight</span>
                      <span className="text-white font-medium">{report.weight}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-pink-100 text-xs">Height</span>
                      <span className="text-white font-medium">{report.height}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-pink-100 text-xs">BMI</span>
                      <span className="text-white font-medium">{report.bmi}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-pink-100 text-xs">Experience</span>
                      <span className="text-white font-medium">{report.experience}</span>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-pink-100 font-medium">BP:</span>
                    <span className="text-white">{report.bloodPressure}</span>
                  </div>

                  <div className="pt-2">
                    <span className="text-pink-100 text-xs font-medium">Achievements:</span>
                    <p className="text-white text-xs mt-1 line-clamp-2 leading-relaxed">
                      {report.achievements}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => updateStatus(report._id, 'Approved')}
                      className="flex-1 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-semibold rounded-lg hover:from-green-500 hover:to-emerald-600 transition-all duration-200 shadow-md"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => updateStatus(report._id, 'Rejected')}
                      className="flex-1 py-2 bg-gradient-to-r from-red-400 to-rose-500 text-white text-xs font-semibold rounded-lg hover:from-red-500 hover:to-rose-600 transition-all duration-200 shadow-md"
                    >
                      Reject
                    </button>
                  </div>
                 <button 
  onClick={() => sendMail(report._id)}
  className="w-full py-2 bg-gradient-to-r from-pink-300 to-purple-400 text-white text-xs font-semibold rounded-lg hover:from-pink-400 hover:to-purple-500 transition-all duration-200 shadow-md"
>
  {mailedReports.includes(report._id) ? 'Sent' : 'Send Mail'}
</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-16" />
    </div>
  );
};

export default Submissions;