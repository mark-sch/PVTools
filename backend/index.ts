import path from "path";
import express from "express"
import * as bodyParser from "body-parser"
import {relayAPIRequest} from "./api/relay";
import dotenv from "dotenv"

//import {processContactRequest} from "./api/contact";

/**
 * Setup some things so the frontend can communicate with the backend
 */
const app = express()
const cors = require('cors')

dotenv.config({ path: '.env.data' })

if (process.env.NODE_ENV === 'production') {
  console.log('Running in PRODUCTION mode');
  app.use(cors({
    origin: ['http://localhost:3000', 'http://pvgis.sunny5.de', 'https://pvgis.sunny5.de']
  }))

} else {
  console.log('Running in DEBUG mode');
  app.use(cors({
    origin: true
  }))
  
}


app.use(bodyParser.json())

/**
 * Open endpoints
 */

app.use(express.static(path.join(__dirname, '..', '..', 'pvtools', 'dist')))

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', '..', 'pvtools', 'dist', 'index.html'))
})

//app.post("/contact", processContactRequest)

app.post("/relay", relayAPIRequest)

/**
 * Start server
 */
app.listen(process.env.PORT || 8082, () => {
  console.log("Server started with port: " + (process.env.PORT || 8082))
})
