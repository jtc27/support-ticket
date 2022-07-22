const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')

const PORT = process.env.PORT || 5000

const app = express()

//middleware lets us send raw jsons & urlencoded form
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// CREATE A ROUTE WITH EXPRESS
app.get('/', (req, res) => {
  res.status(200).json({message: 'Welcome to the Support Desk API'})
})

//Routes
app.use('/api/users', require('./routes/userRoutes'))

//ErrorHandler
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

