const path = require('path')
const viewspath = path.join(__dirname,'views')
const assetspath = path.join(__dirname,'assets')
const express = require('express')
const fs = require('fs')
const adminTemp = fs.readFileSync(path.join(viewspath,'admin.html'))

function getTemplate(path){
  return fs.readFileSync(
    path
  ).toString()
}

function replacePart(source,part,tgt){
  return source.replace(
    `x{${part}}x`,getTemplate(path.join(path.join(viewspath,`${tgt}.html`)))
  )
}

function staticData(app){
  app.use(
    '/sio',
    express.static(
      path.join(viewspath,'..','..','node_modules/socket.io/client-dist/socket.io.js')
    )
  )
  app.use(
    '/socket.io.js.map',
    express.static(
      path.join(viewspath,'..','..','node_modules/socket.io/client-dist/socket.io.js.map')
    )
  )
  app.use(
    '/',express.static(assetspath)
  )
}

function addRoutes(app){
  staticData(app)
  app.get(
    '/',(req,res)=>{
      const view = replacePart(getTemplate(path.join(viewspath,'index.html')),'splash','splash')
      res.send(
        view
      )
    }
  )
  app.get(
    '/menu',(req,res)=>{
      const view = replacePart(getTemplate(path.join(viewspath,'menu.html')),'splash','splash')
      res.send(
        view
      )
    }
  )
  app.get(
    '/menus',(req,res)=>{
      const view = replacePart(getTemplate(path.join(viewspath,'menus.html')),'splash','splash')
      res.send(
        view
      )
    }
  )
  app.get(
    '/login',(req,res)=>{
      res.send(
        getTemplate(path.join(viewspath,'login.html'))
      )
    }
  )
  app.get(
    '/logout',(req,res)=>{
      res.send(
        getTemplate(path.join(viewspath,'logout.html'))
      )
    }
  )
  app.get(
    '/admin',(req,res)=>{
      let adminview = getTemplate(path.join(viewspath,'admin.html'))
      adminview = replacePart(adminview,'adminmenus','menus')
      adminview = replacePart(adminview,'admincommandes','commandes')
      adminview = replacePart(adminview,'articles','articles')
      adminview = replacePart(adminview,'ajouterarticle','ajouterarticle')
      adminview = replacePart(adminview,'ajoutermenu','ajoutermenu')
      adminview = replacePart(adminview,'ajoutercommande','ajoutercommande')
      adminview = replacePart(adminview,'splash','splash')
      res.send(
        adminview
      )
    }
  )
}

module.exports = {
  addRoutes
}
