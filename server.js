const express = require('express')
const connectDB = require('./config/db')
const apiUsers = require('./routes/api/users')
const apiAuth = require('./routes/api/auth')
const apiPost = require('./routes/api/post')
const apiProfile = require('./routes/api/profile')
const apiemail = require('./routes/api/passwordRecover')
const apiAds = require('./routes/api/ads')
const apiMessage = require('./routes/api/message')
const apiAdvertising = require('./routes/api/advertising') 
const apiConflict = require('./routes/api/conflict')
const app = express()


// Connecting Our DataBase
connectDB();

// Init Middleware
app.use(express.json({ extended: false }))
app.use('/public', express.static('public'))
            
app.get('/', (req, res)=> res.send('API Running'))

// Our Routes
app.use('/api/users', apiUsers)
app.use('/api/auth', apiAuth)
app.use('/api/post', apiPost)
app.use('/api/profile', apiProfile)
app.use('/api/passwordRecover', apiemail)
app.use('/api/ads', apiAds)
app.use('/api/message', apiMessage)
app.use('/api/advertising', apiAdvertising) 
app.use('/api/conflict', apiConflict)



const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> console.log(`Server Started On PORT ${PORT}`) )

