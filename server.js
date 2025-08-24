const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/puremetrix', { useNewUrlParser: true, useUnifiedTopology: true })

const SettingsSchema = new mongoose.Schema({
  heroImage: String,
  aboutImage: String,
  serviceImages: Object,
  serviceVideos: Object,
  companyLogo: String,
  contactPhone: String,
  contactEmail: String,
  contactAddress: String,
  whatsappNumber: String,
  promoVideo: String,
})

const Settings = mongoose.model('Settings', SettingsSchema)

app.get('/settings', async (req, res) => {
  const settings = await Settings.findOne()
  res.json(settings)
})

app.post('/settings', async (req, res) => {
  let settings = await Settings.findOne()
  if (!settings) settings = new Settings()
  Object.assign(settings, req.body)
  await settings.save()
  res.json(settings)
})

// For file uploads (images/videos)
const upload = multer({ storage: multer.memoryStorage() })
app.post('/upload', upload.single('file'), (req, res) => {
  // Save file to disk or cloud, then return URL
  // For demo, just return base64
  res.json({ url: `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}` })
})

app.listen(4000, () => console.log('API running on http://localhost:4000'))