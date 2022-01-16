const  path  = require("path")
const dbactions = require(path.join(__dirname,'actions?.js'))
class CommandeArticle {
  constructor(nom,prix,quantite){
    this.nom = nom
    this.prix= prix
    this.quantite = quantite
    this.total = 0
  }
  getTotal(){
    return this.calculateTotal()
  }
  calculateTotal(){
    return this.total = this.quantite * this.prix
  }
}
class Commande{
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
  addArticle(nom,prix,quantite){
    this.articles.push(
      new CommandeArticle(nom,prix,quantite)
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
  constructor(){
    this.articles = []
    this.total    = 0
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
  constructor(db){
    this.db = db
    this.configureDeebee()
  }
}
module.exports = {
  Commandes,Commande,CommandeArticle
}
