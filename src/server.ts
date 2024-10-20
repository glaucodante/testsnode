import dotenv from 'dotenv'
import app from './app'

// utilizado no AR
dotenv.config()

app.listen(process.env.PORT)