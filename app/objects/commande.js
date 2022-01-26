const  path  = require("path")
const dbactions = require(path.join(__dirname,'actions?.js'))
class CommandeArticle {
  constructor({nom,prix,quantite},db){
    this.db = db
    this.nom = nom
    this.prix= prix
    this.quantite = quantite
    this.total = 0
    this.updateData(

    )
  }
  get(){
    return {
      nom:this.nom,
      prix:this.prix,
      quantite:this.quantite,
      total:this.getTotal()
    }
  }
  getTotal(){
    return this.calculateTotal()
  }
  calculateTotal(){
    return this.total = this.quantite * this.prix
  }
  updateData(){
    this.db.getArticle(
      {nom:this.nom},(e,{id,nom,prix,quantite})=>{
        this.id = id
        this.nom = nom
        this.prix= prix
        this.quantite = quantite
      }
    )
  }
}
class Commande{
  
  get(){
    return {
      id:this.id,
      uuid:this.uuid,
      date:this.date,
      articles:this.articles.map(article=>article.get())
    }
  }
  
  getArticle(nom,id){
    let searched  = [id?'id':'nom',id?id:nom]
    let found     = null
    this.articles.forEach(
      article=>{
        if(article[searched[0]]===searched[1]) found = article
      }
    )
    return found
  }
  
  addArticle(article){
    this.articles.push(
      new CommandeArticle(article,this.db)
    )
  }
  
  addArticles(articles){
    articles.forEach(
      article=>{
        this.addArticle(article)
      }
    )
  }
  
  calculateTotal(){
    this.articles.forEach(
      article=>{
        this.total += article.calculateTotal()
      }
    )
      return this.total
  }
  
  getTotal(){
    return this.calculateTotal()
  }
  
  updateData(cb){
    this.db.getArticlesCommande(
      this.id,(e,articles_commande)=>{
        this.addArticles(articles_commande)
        if(cb)cb({articles:this.articles,data:this.data})
      }
    )
  }

  constructor(data,db){
    this.db = db
    this.data = data
    this.id = this.data.id
    this.uuid = this.data.uuid
    this.date = this.data.date
    this.articles = []
    this.total    = 0
    this.updateData(data=>{
    })
  }


}
class Commandes{

  configureDeebee(){
    const actions = dbactions.Commandes
    actions.forEach(
      action=>{
        const actionname = action[0]
        const callback = action[1]
        this.db._____registerAction(actionname,callback)
      }
    )
  }

  insertCommande(data,cb){
    this.db.addCommande(
      data,cb
    )
  }

  getCommandes(cb){
    this.setCommandes(
      ()=>{
        if(cb)cb(this.commandes.map(commande=>commande.get()))
      }
    )
    return this.commandes.map(commande=>commande.get())
  }

  setCommandes(cb){
    this.db.getCommandes((err,commandes)=>{
      if(err)console.log(err);else{
        commandes = commandes ? commandes : []
        this.commandes = commandes ? [] : this.commandes
        this.addCommandes(commandes)
        if(cb)cb(this.getCommandes())
      }
    })
  }
  
  
  addCommande(data){
    this.commandes.push(
      new Commande(data,this.db)
    )
  }
    
  addCommandes(commandes){
    commandes.forEach(
      (commande)=>{
        this.addCommande(commande)
      }
    )
  }
  
  constructor(db){
    this.db = db
    this.configureDeebee()
    this.setCommandes(
      data=>{
      }
    )
  }
}
module.exports = {
  Commandes,Commande,CommandeArticle
}
 