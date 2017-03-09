'use strict'

const express = require('express')
const morgan = require('morgan')
const webpack = require('webpack')
const config = require('./webpack.config')
const path = require('path')
// const mongoose = require('mongoose')
const stormpath = require('express-stormpath')
const bodyParser = require('body-parser')
// const methodOverride = require('method-override')
// const flash = require('connect-flash')
require('dotenv').config({ silent: true })
const app = express()
const compiler = webpack(config)
const os = require('os')
const http = require('http').createServer(app)
const port = process.env.PORT || 3000
const io = require('socket.io')(http)

app.use(morgan('dev'))

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(stormpath.init(app, {
  client: {
    apiKey: {
      id: process.env.REACT_APP_STORMPATH_API_KEY,
      secret: process.env.REACT_APP_STORMPATH_API_KEY_SECRET
    }
  },
  application: {
    href: `https://api.stormpath.com/v1/applications/${process.env.REACT_APP_STORMPATH_APPLICATION}`
  },
  web: {
    produces: ['application/json']
  }
  // },
  // endpoints: {
  //   baseUri: 'https://zesty-gecko.apps.stormpath.io'
  // }
}))

app.post('/me', bodyParser.json(), stormpath.authenticationRequired, function (req, res) {
  function writeError (message) {
    res.status(400)
    res.json({ message: message, status: 400 })
    res.end()
  }

  function saveAccount () {
    req.user.givenName = req.body.givenName
    req.user.surname = req.body.surname
    req.user.email = req.body.email
    req.user.customData.userType = req.body.userType

    req.user.save(function (err) {
      if (err) {
        return writeError(err.userMessage || err.message)
      }
      res.end()
    })
  }

  if (req.body.password) {
    var application = req.app.get('stormpathApplication')

    application.authenticateAccount({
      username: req.user.username,
      password: req.body.existingPassword
    }, function (err) {
      if (err) {
        return writeError('The existing password that you entered was incorrect.')
      }

      req.user.password = req.body.password

      saveAccount()
    })
  } else {
    saveAccount()
  }
})

app.get('/css/bootstrap.min.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'build/css/bootstrap.min.css'))
})

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build/index.html'))
})

app.on('stormpath.ready', function () {
  http.listen(port)
  console.log('Listening')
  // app.listen(port, 'localhost', function (err) {
  //   if (err) {
  //     return console.error(err)
  //   }
  //   console.log('Listening')
  // })
})

io.on('connect', function (socket) {
  // convenience function to log server messages on the client
  function log () {
    let array = ['Message from server:']
    array.push.apply(array, arguments)
    socket.emit('log', array)
  }

  socket.on('message', function (message) {
    log('Client said: ', message)
    // socket.broadcast.emit('message', message)
    // for a real app, would be room-only (not broadcast)
    socket.broadcast.to(room).emit('message', message)
  })

  socket.on('create or join', function (room) {
    log('Received request to create or join room ' + room)

    let numClients = io.engine.clientsCount
    log('Room ' + room + ' now has ' + numClients + ' client(s)')

    if (numClients === 1) {
      socket.join(room)
      log('Client ID ' + socket.id + ' created room ' + room)
      socket.emit('created', room, socket.id)
    } else if (numClients === 2) {
      log('Client ID ' + socket.id + ' joined room ' + room)
      io.sockets.in(room).emit('join', room)
      socket.join(room)
      socket.emit('joined', room, socket.id)
      io.sockets.in(room).emit('ready')
    } else { // max two clients
      socket.emit('full', room)
    }
  })

  socket.on('ipaddr', function () {
    let ifaces = os.networkInterfaces()
    for (let dev in ifaces) {
      ifaces[dev].forEach(function (details) {
        if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
          socket.emit('ipaddr', details.address)
        }
      })
    }
  })

  socket.on('bye', function () {
    console.log('received bye')
  })
})

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/oathcast')
// mongoose.Promise = global.Promise

// app.use(express.static(path.join(__dirname, 'public')))

// app.use(flash())

// app.use(methodOverride('_method'))

// app.use(bodyParser.urlencoded({ extended: false }))

// app.use(function (req, res, next) {
//   res.locals.alerts = req.flash()
//   res.locals.currentUser = req.user
//   next()
// })
