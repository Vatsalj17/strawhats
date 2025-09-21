import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Pages/Home'
import OTP from './Pages/OTP'
import InstituteLogin from './Pages/InstituteLogin'
import InstiuteDashboard from './Pages/InstituteDashboard'
import PlayerLogin from './Pages/PlayerLogin'
import CoachLogin from './Pages/CoachLogin'
import OTPplayer from './Pages/OTPplayer'
import PlayerDashboard from './Pages/PlayerDashboard'
import Academy from './Pages/Academy'
import AcademyDetails from './Pages/AcademyDetails'
import Report from './Pages/Report'
import Ai from './Pages/Ai'
import Submissions from './Pages/Submissions'
import YourSub from './Pages/YourSub'

function App() {

  return (
    <BrowserRouter>
<Routes>
  <Route path='/' element={<Home/>} />
  <Route path='/instituteLogin' element={<InstituteLogin/>} />
  <Route path='/fitness' element={<Ai/>} />
  <Route path='/coachLogin' element={<CoachLogin/>} />
  <Route path='/playerLogin' element={<PlayerLogin/>} />
  <Route path='/otp' element={<OTP/>} />
  <Route path='/:academyId/submission' element={<Submissions/>} />
  <Route path='/:playerId/reports' element={<YourSub/>} />
  <Route path='/:playerId/:academyId/report' element={<Report/>} />
  <Route path='/otp-player' element={<OTPplayer/>} />
  <Route path='/instituteDashboard' element={<InstiuteDashboard/>} />
  <Route path='/playerDashboard' element={<PlayerDashboard/>} />
  <Route path='/academy/:acaId' element={<AcademyDetails/>} />
  <Route path='/:id/academies' element={<Academy/>} />
</Routes>
    </BrowserRouter>
  )
}

export default App
