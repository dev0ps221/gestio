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

const viewspath = path.join(__dirname,'views')
const assetspath = path.join(__dirname,'assets')


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



function matchPath(pathname){
    return existsSync(pathname)
}

const shop = new TeeShop(
    TeeShop._d_conf(),creds,(shop)=>{

        shop.server = server
        shop.sockets = new TeeSio(socketsconf)
        shop.sockets.whenReady(
            ()=>{
                shop.sockets.registerSocketListener(
                    [
                        'hi',(data,socket)=>{
                        
                            console.log('got hi from someone')
                            console.log(data)
                            console.log('baxna nonou')


                            console.log('\n\n\n\n\n',socket)
                        
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
