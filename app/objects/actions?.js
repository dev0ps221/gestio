const Articles  = [
  [
    'addArticle',function(data,cb){
      let {nom,prix} = data
      let req = this.__insertINTO(
        'articles',['nom','prix'],[`'${nom}'`,prix],[[],[]]
      )
      this.db.query(
        req,cb
      )
    }
  ],[
    'removeArticle',function(data,cb){
      let {nom,id} = data
      let req = this.__delFrom(
        'articles',[[id?'id':'nom'],[id?id:`'${nom}'`]]
      )
      this.db.query(
        req,cb
      )
    }
  ],[
    'getArticle',function(data,cb){
      let {nom,id} = data
      console.log('get article req conds',[[id?'id':'nom'],[id?id:`'${nom}'`]])
      let req = this.__selectFrom(
        'articles',['*'],[[id?'id':'nom'],[id?id:`'${nom}'`]]
      )
      console.log('get article req',req)
      this.db.query(
        req,cb
      )
    }
  ],[
    'getArticles',function(cb){
      let req = this.__selectFrom(
        'articles',['*'],[[],[]]
      )
      this.db.query(
        req,cb
      )
    }
  ]
]
const Menus     = [
  [
    'getMenus',function(cb){

      let req = this.__selectFrom(
        'menu',['*'],[],[[],[]]
      )
      this.db.query(
        req,cb
      )
    }
  ],[
    'getArticleMenu',function(data,cb){
      let {id_menu} = data
      let req = this.__selectFrom(
        'article_menu',[],[['id_menu'],[id_menu]]
      )
      this.db.query(
        req,cb
      )
    }
  ],[
    'addArticleMenu',function(data,cb){
      let {id_article,id_menu} = data
      let req = this.__insertINTO(
        'article_menu',['id_article','id_menu'],[id_article,id_menu],[[],[]]
      )
      this.db.query(
        req,cb
      )
    }
  ],[
    'addMenu',function(data,cb){
      let {nom} = data
      let req = this.__insertINTO(
        'menus',['nom'],[`'${nom}'`],[[],[]]
      )
      this.db.query(
        req,cb
      )
    }
  ]
]

const Commandes = [
    [
      'getCommandes',function(cb){

        let req = this.__selectFrom(
          'commande',['*'],[[],[]]
        )
        this.db.query(
          req,cb
        )
      }
    ],
    [
      'addArticleCommande',function(data,cb){
        let {id_article,id_commande} = data
        let req = this.__insertINTO(
          'article_commande',['id_article','id_commande'],[id_article,id_commande],[[],[]]
        )
        this.db.query(
          req,cb
        )
      }
    ],
    [
      'addCommande',function(data,cb){
        let {user,articles} = data
        let req = this.__insertINTO(
          'commande',[],[],[[],[]]
        )
        this.db.query(
          req,(e,r)=>{
            if(e){
              console.log(e)
            }else{
              if(r){
                let id_commande = r.insertId
                if(id_commande){
                  articles.forEach(
                    (id_article,idx)=>{
                      this.db.addArticleCommande(
                        {id_article,id_commande},(er,re)=>{
                          if(er)console.log(er)
                          else{
                            if(re){
                              console.log(re)
                            }else{
                              er = 'error adding new article to command'
                              console.log('error adding new article to command')
                            }
                            cb(er,re)
                          }
                        }
                      )
                    }
                  )
                }
              }else{
                  console.log('error adding new command')
              }
            }
          }
        )
      }
    ]
  ]

  module.exports = {
      Commandes,Menus,Articles
  }
