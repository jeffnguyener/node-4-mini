require('dotenv').config()
const express = require('express')
const {SERVER_PORT, SESSION_SECRET} = process.env
const app = express()
const mc = require('./messageCtrl')
const session = require('express-session')


app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))

app.get('/api/messages', mc.getAllMessages)
app.get('/api/messages/history', mc.history)
app.post('/api/message', mc.createMessage)

app.listen(SERVER_PORT, () => console.log(`Running on port ${SERVER_PORT}`))
