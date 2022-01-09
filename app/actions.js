const path = require('path')
const objectspath = path.join(__dirname,'objects')
let menus   = require(path.join(objectspath,'menu'))
let commandes   = require(path.join(objectspath,'commande'))
let users = require(path.join(objectspath,'user'))
let articles = require(path.join(objectspath,'article'))
let clients = require(path.join(objectspath,'client'))
let deebee = require(path.join(objectspath,'deebee'))
let dbman = new deebee({
  host:'',user:'',password:'',database:'resto'
})
let sockets = []


const manager = {
  menus:new menus.Menus(dbman),
  commandes:new commandes.Commandes(dbman),
  users:new users.Users(dbman),
  articles:new articles.Articles(dbman),
  clients:new clients.Clients(dbman)
}

function setSocketListeners(socket){

  socket.on(
    '/articles',()=>{
      socket.emit(
        '/articlesRes',manager.articles.getArticles()
      )
    }
  )

  socket.on(
    '/ajouter_article',(article)=>{
      manager.articles.insertArticle(
        article,(e,r)=>{
          if(e){
            console.log(e)
            e = 'erreur, rééssayez plus tard!!!'
          }
          socket.emit(
            '/ajouter_articleRes',e,r
          )
          socket.emit(
            '/articlesRes',manager.articles.getArticles()
          )
        }
      )
    }
  )

  socket.on(
    '/login',({username,password})=>{
      console.log('login requested')
      console.log('username is',username)
      manager.users.logUser(
        username,password,(err,res)=>{
          console.log('login results')
          if(err){
            socket.emit(
              '/loginRes','Identifiant ou|et Mot de passe incorrect|s',r
            )
            return
          }
          if(res.length){
            socket.emit(
              '/loginRes',err,res
            )
          }else{
            socket.emit(
              '/loginRes','Identifiant ou|et Mot de passe incorrect|s',r
            )
          }
        }
      )
    }
  )
}

function socketActions(socket){
  setSocketListeners(socket)
}

function listenSockets(io){

  io.on(
    'connection',socket=>{
      socketActions(socket)
    }
  )

}

module.exports = {
  listenSockets
}
