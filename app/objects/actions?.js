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
      let req = this.__selectFrom(
        'articles',['*'],[[id?'id':'nom'],[id?id:`'${nom}'`]]
      )
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
    'getMenu',function(data,cb){
      const {nom,id} = data
      let req = this.__selectFrom(
        'menu',['*'],[],[[nom?'nom':'id'],[nom?`'${nom}'`:id]]
      )
      this.db.query(
        req,cb
      )
    }
  ],[
    'getArticlesMenu',function(data,cb){
      let {id_menu} = data
      let req = this.__selectFrom(
        'article_menu',['*'],[['id_menu'],[id_menu]]
      )

      this.db.query(
        req,cb
      )
    }
  ],[
    'getArticleMenu',function(data,cb){
      let {id_menu,id_article} = data
      let req = this.__selectFrom(
        'article_menu',['*'],[['id_menu','id_article'],[id_menu,id_article]]
      )
      this.db.query(
        req,(e,r)=>{
          if(e){
            cb(e,r)
          }else{
            if(r&&r.length){
              req = this.__selectFrom(
                'articles',['*'],[['id'],[r[0].id]]
              ) 
              this.db.query(
                req,cb
              )
            }else{
              cb(e,r)
            }
          }
        }
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
        'menu',['nom'],[`'${nom}'`],[[],[]]
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
    ],[
      'getArticlesCommande',function(id,cb){
        let req = this.__selectFrom(
          'article_commande',['*'],[],[['id_commande'],[id]]
        )
        this.db.query(
          req,(e,r)=>{
            if(e)cb(e,r)
            else{
              if(r.length){
                let articles = []
                r.forEach(
                  (article,idx)=>{
                    this.getArticle({id:article.id_article},(e,articledata)=>{
                      article.nom = articledata[0].nom
                      article.id = articledata[0].id
                      article.prix=articledata[0].prix
                      articles.push(article)
                      if(idx+1==r.length){
                        cb(e,articles)
                      }
                    })
                  }
                )
              }else{
                cb(e,r)
              }
            }
          }
        )
      }
    ],
    [
      'addArticleCommande',function(data,cb){
        let {id_article,id_commande,quantite} = data
        let req = this.__insertINTO(
          'article_commande',['id_article','id_commande','quantite'],[id_article,id_commande,quantite],[[],[]]
        )
        this.db.query(
          req,cb
        )
      }
    ],
    [
      'addCommande',function(data,cb){
        console.log('addCommande data is > >=<> >',data)
        let {uuid,articles} = data
        let req = this.__insertINTO(
          'commande',['uuid'],[`'${uuid}'`],[[],[]]
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
                    ({id,quantite},idx)=>{
                      const id_article = id
                      this.addArticleCommande(
                        {id_article,id_commande,quantite},(er,re)=>{
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
