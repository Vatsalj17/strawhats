import express from 'express'
import Institute from '../models/InstituteModel.js'
import Player from '../models/playerModel.js'

const router = express.Router()

// Get a single academy by ID
router.get('/academy/:id', async (req, res) => {
    const { id } = req.params
    try {
        const aca = await Institute.findById(id)
        if (!aca) return res.status(400).json({ message: 'No Academy' })
        return res.status(200).json({ message: 'Academy found', academy: aca })
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message })
    }
})
router.get('/matchingAcademy/:userId', async (req, res) => {
    const { userId } = req.params

    try {
        // Get the user
        const user = await Player.findById(userId)
        if (!user) return res.status(404).json({ message: 'User not found' })

        const userSports = user.sports || []

        // Find institutes where at least one sport matches
        const matchingAcademies = await Institute.find({
            sports: { $in: userSports }
        })

        res.status(200).json({ success: true, academies: matchingAcademies })
    } catch (err) {
        console.error(err)
        res.status(500).json({ success: false, message: 'Server error', error: err.message })
    }
})

router.get('/girls', async (req, res) => {
  try {
    // Use query param or default to "Yes"
    const forGirls = req.query.forGirls || 'Yes';

    // Fetch institutes where forGirls matches the string
    const institutes = await Institute.find({ forGirls });

    if (!institutes || institutes.length === 0) {
      return res.status(404).json({ success: false, message: 'No institutes found for girls' });
    }

    res.status(200).json({ success: true, message: 'Institutes for girls', institutes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});


export default router