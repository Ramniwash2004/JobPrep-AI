import 'dotenv/config'
import app from './src/app.js'

// const connectToDB = require("./src/config/database")

// connectToDB()
const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})