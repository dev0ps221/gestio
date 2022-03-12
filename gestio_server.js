const TeeShop = require('@tek-tech/teeshop')
const sio = require('socket.io')
const http = require('http')
const express = require('express')
const app = new express()
const server = http.createServer(app)


const teesio  = require('@tek-tech/teesio')
const TeeSio = teesio.TeeSio
TeeShop.defaultcreds.database = 'gestio_1'
TeeShop._sd_conf()
TeeShop._sd_creds()


const port = process.env.PORT || 80
const creds = {
    host:process.env.dbh,
    user:process.env.dbu,
    password:process.env.dbp,
    database:process.env.dbn,
}



const {TeeSioServSocket}  = require('@tek-tech/teesio-socket')
const { readFileSync, existsSync } = require('fs')
const path = require('path')
const socketsconf = {
    sio,
    server:{getInstance:function(){return this.server},server},
    express,
    usesTeeWeb:true,
    socket: TeeSioServSocket
}
const corepath = path.join(__dirname,'core')
const viewspath = path.join(__dirname,'views')
const assetspath = path.join(__dirname,'assets')



function matchPath(pathname){
    return existsSync(pathname)
}

const shop = new TeeShop(
    TeeShop._d_conf(),creds,(shop)=>{

        
        shop.actions = require(path.join(corepath,'actions'))
        shop.server = server
        shop.sockets = new TeeSio(socketsconf)

        

        app.use(
            '/comp',express.static(path.join(assetspath,'/components'))
        )
        app.use(
            '/js',express.static(path.join(assetspath,'/js'))
        )
        app.use(
            '/css',express.static(path.join(assetspath,'/css'))
        )
        app.use(
            '/',express.static(path.join(assetspath))
        )
        app.get(
            '/ears',(req,res)=>{
                res.sendFile(require('path').join(process.cwd(),"node_modules","@tek-tech/ears","ears.js"))
            }
        )
        app.get(
            '/sio',(req,res)=>{
                res.sendFile(require('path').join(process.cwd(),"node_modules","socket.io/client-dist","socket.io.min.js"))
            }
        )
        app.get(
            '/socket.io.min.js.map',(req,res)=>{
                res.sendFile(require('path').join(process.cwd(),"node_modules","socket.io/client-dist","socket.io.min.js.map"))
            }
        )
        app.get(
            '/teeshop',(req,res)=>{
                res.send(shop.cliClass().toString())
            }
        )
        app.get(
            '/siosocket',(req,res)=>{
                res.header(
                    'Content-type','text/javascript'
                )
                res.sendFile(shop.sockets.getSocketClassPath())
            }
        )
        shop.sockets.whenReady(
            ()=>{
                shop.sockets.registerSocketListener(
                    [
                        'logad',({username,password},socket)=>{
                        
                            shop.logAdm(
                            
                                username,password,(admin)=>{
                                    
                                    if(admin) socket.post(
                                        'logadRes',admin.id
                                    )
                            
                                }
                            
                            )
                            // console.log('got hi from someone')
                            // console.log(data)
                            // console.log('baxna nonou')


                            // console.log('\n\n\n\n\n',socket)
                        
                        }
                    ]
                )






                function getCategories(socket){

                    shop.getCategories(
                        categories=>{
                            const action = (categories)=>{
                                if(categories.length){
                                        
                                    let data = []
                                    categories.forEach(
                                        (cat,idx)=>{
                                            cat.whenGotArticles(
                                                ()=>{
                                                    function action2(socket){
                                                        if(idx+1==categories.length){
                                                            socket.post(
                                                                'categoriesRes'
                                                                ,data
                                                            )
                                                        }
                                                    }
                                                    cat._data.articles = cat._data.articles.map(
                                                        (article,i)=>{
                                                            return article._data
                                                        }
                                                    )
                                                    data.push(cat._data)
                                                    action2(socket)
                                                }
                                            )
                                        }
                                    )

                                }else{
                                    console.log('bafi')
                                    shop._new_categorie(
                                        'Tous','all.jpg',(e,r)=>{
                                            console.log(e,r)
                                            console.log('nungi baax fii')
                                            shop.getCategories(
                                                cat=>cat.getCategories(action)
                                            )
                                    
                                        }
                                    )
                                }
                            }
                            categories.getCategories(
                                action
                            )
                        }
                    )
                }
                function getCommandes(socket){
                    shop.getCommandes(
                        commandes=>{
                            const action = (commandes)=>{
                                if(commandes.length){
                                    let data = []
                                    commandes.forEach(
                                        (commande,idx)=>{
                                            commande.setData(
                                                ()=>commande.articles(
                                                    articles=>{
                                                        const cdata = commande._data
                                                        cdata.articles = articles.map(article=>{return article._data})
                                                        data.push(cdata)
                                                        if(idx+1==commandes.length){                                                
                                                            socket.post(
                                                                'commandesRes',data
                                                            )
                                                        }
                                                    }
                                                )
                                            
                                            )


                                        }
                                    )

                                }else{
                                    socket.post(
                                        'commandesRes',[]
                                    )
                                }
                            }
                            commandes.getCommandes(
                                action
                            )
                        }
                    )
                }
                shop.sockets.registerSocketListener(
                    ['categories',(data,socket)=>{
                        shop.setData(
                            ()=>{
                                getCategories(socket)
                            }
                        )
                    }]
                )
                shop.sockets.registerSocketListener(
                    ['commandes',(data,socket)=>{
                        shop.setData(
                            ()=>{
                                console.log('commandes')
                                getCommandes(socket)
                            }
                        )
                    }]
                )


                shop.sockets.registerSocketListener(
                    [
                        'add_article',({catid,nom,prix,illu},socket)=>{
                            const {uploadIllu} = (shop.actions)
                            uploadIllu(
                                illu,(illupath)=>{
                                    console.log(illupath,' is illupath')
                                    shop._new_article_categorie(
                                        catid,nom,prix,illu,(res)=>{
                                            console.log('resultats ajout article')
                                            console.log(res)
                                        }
                                    )
                                }
                            )
                        }
                    ]
                )

                shop.sockets.registerSocketListener(
                    [
                        'add_categorie',({nom,illu},socket)=>{
                            const {uploadIllu} = (shop.actions)
                            uploadIllu(
                                illu,(illupath)=>{
                                    shop._new_categorie(
                                        nom,illu,(res)=>{
                                            console.log('resultats ajout article')
                                            console.log(res)
                                        }
                                    )
                                }
                            )
                        }
                    ]
                )





            }
        )
        shop.server.listen(
            port,(e)=>{
                if(!e)console.log('server bangui daw port:',port)
            }
        )
        shop.sockets.listen(

        )

        app.get(
            ['/','/:pagepath','/:pagepath/:pagepath/:pathdata'],(req,res)=>{
                const replacement = `<!-- content -->`
                const page = readFileSync(path.join(viewspath,'base.html')).toString()
                const {pagepath,pathdata} = req.params 
                const ppath = path.join(viewspath,`${pagepath ? pagepath : 'home'}.html`)
                res.send(
                    page.replace(replacement,matchPath(ppath) ? readFileSync(ppath).toString():'PAGE NON TROUVÉE !!')
                )
            }
        )

    }
)
