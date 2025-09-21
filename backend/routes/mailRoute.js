import express from 'express'
import Report from '../models/report.js'
import Player from '../models/playerModel.js'
import { transporter } from '../utils/otp.js'

const router = express.Router()

// POST /api/reports/:reportId/send-mail
router.post("/:reportId/send-mail", async (req, res) => {
  try {
    const { reportId } = req.params
    const { subject, message: customMessage } = req.body

    // Find report
    const report = await Report.findById(reportId)
    if (!report) {
      return res.status(404).json({ message: "Report not found" })
    }

    // Find player linked to this report
    const player = await Player.findById(report.playerId)
    if (!player || !player.email) {
      return res.status(404).json({ message: "Player email not found" })
    }

    // Use a message constant
    const message = customMessage || `
Hello ${player.name},

Your report status is currently: "${report.status}".
You can check the dashboard for full report details.
`

    // Send mail
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: player.email,
      subject: subject || "Report Update",
      text: message,
    })

    res.json({ message: `Mail sent to ${player.email}` })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

export default router
