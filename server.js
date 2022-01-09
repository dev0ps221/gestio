const sio     = require('socket.io')
const express = require('express')
const app     = new express()
const http    = require('http')
const server  = http.createServer(app)
const io      = sio()
const port    = 80
const path    = require('path')
const router  = require(path.join(__dirname,'app','routes'))
const actions = require(path.join(__dirname,'app','actions'))

io.listen(
  server
)



server.listen(port,error=>{
  if(error)console.log(error)
  else{
    console.log(
      'listening on ',port
    )
    router.addRoutes(app)
    actions.listenSockets(io)
  }
})
