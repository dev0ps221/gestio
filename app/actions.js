const path = require('path')
const objectspath = path.join(__dirname,'objects')
let menus   = require(path.join(objectspath,'menu'))
let commandes   = require(path.join(objectspath,'commande'))
let users = require(path.join(objectspath,'user'))
let articles = require(path.join(objectspath,'article'))
let clients = require(path.join(objectspath,'client'))
let deebee = require(path.join(objectspath,'deebee'))
let {v4} = require('uuid')
let dbman = new deebee({
  host:process.env.MSQH,user:process.env.MSQU,password:process.env.MSQP,database:process.env.MSQD
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

  socket.uuid = v4() 

  console.log(socket.uuid)

  socket.on(
    '/articles',()=>{
      socket.emit(
        '/articlesRes',manager.articles.getArticles()
      )
    }
  )

  socket.on(
    '/menus',()=>{
      socket.emit(
        '/menusRes',manager.menus.getMenus()
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
    '/ajouter_menu',(menu)=>{
      manager.menus.insertMenu(
        menu,(e,r)=>{
          if(e){
            console.log(e)
            e = 'erreur, rééssayez plus tard!!!'
          }
          socket.emit(
            '/ajouter_menuRes',e,r
          )
          socket.emit(
            '/menusRes',manager.menus.getMenus()
          )
        }
      )
    }
  )

  socket.on(
    '/nouvel_article_menu',({article,menu_id,article_id})=>{
      

      const id_article = article_id
      const id_menu = parseInt(menu_id)
      let menu = (manager.menus.getById(id_menu))
      let e = null
      let r = null
      if(menu){
        
        if(article_id=='aucun'){
          const {nom_article,prix_article} = article
          if(nom_article&&prix_article){

            manager.articles.insertArticle(
              article,(e,r)=>{
                if(e){
                  console.log(e)
                  e = 'erreur, rééssayez plus tard!!!'
                }else{
                  manager.menus.insertMenuArticle({id_article,id_menu},(e,r)=>{
                    if(e){
                      console.log(e)
                      e = 'erreur, rééssayez plus tard!!!'
                    }
                  })
                }
              }
            )
          }else{
            e = 'menu et article non specifies'
          }
        }else{
          
          manager.menus.insertMenuArticle(
            {id_menu,id_article},(e,r)=>{
              if(e){
                console.log(e)
                e = 'erreur, rééssayez plus tard!!!'
              }
            }
          )
          menu.updateData((data)=>{
            socket.emit(
              '/menusRes',manager.menus.getMenus()
            )
          })

        }
      }else{
        e = 'menu non specifie'
      }
      if((typeof r) != "undefined"){
        let r = null
      }
      socket.emit(
        '/nouvel_article_menuRes',e,(typeof r)!='undefined'?r:null
      )
    }


  )

  socket.on(
    '/login',({username,password})=>{
      manager.users.logUser(
        username,password,(err,res)=>{
          if(err){
            socket.emit(
              '/loginRes','Identifiant ou|et Mot de passe incorrect|s',res
            )
            return
          }
          if(res.length){
            socket.emit(
              '/loginRes',err,res
            )
          }else{
            socket.emit(
              '/loginRes','Identifiant ou|et Mot de passe incorrect|s',res
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
