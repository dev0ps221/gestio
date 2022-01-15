const articles_commande = document.querySelector('#articles_commande .liste_articles')
class ArticleCommande{
  
  
  destroy(){
    this.destroy()
  }

  setTotal(){
    this.prixtotal = this.quantite * this.prix
    return this.prixtotal 
  } 
  
  increase(cb){
    this.quantite++
    this.checkHealth()
    if(cb)cb(this)
  }
  
  decrease(cb){
    this.quantite--
    this.checkHealth()
    if(cb)cb(this)
  }
  
  checkHealth(){
    if(!this.quantite) this.destroy()
    return this
  }
  
  hasId(id){
    return this.id === id
  }

  constructor({nom,prix,id}){
    this.quantite = 1
    this.id       = id
    this.nom      = nom
    this.prix     = prix
    this.prixtotal= this.setTotal()
  }
}
class Commande{
  ajouterArticle(data){
    this.articles.push(new ArticleCommande(data))
    updateCommandeView()
  }
  voirArticle(id){
    let found = null
    this.articles.forEach(
      article=>{
        if(article.hasId(id)){
          found = article
        }
      }
    )
    return found
  }
  constructor(){
    this.articles = []
    this.total    = 0
  }
}
  
window.commande_actuelle = new Commande()
updateCommandeView()

  
  

function updateCommandeView(){
  articles_commande.innerText = ""
  commande_actuelle.articles.forEach(
    article=>articles_commande.appendChild(buildCommandeArticleView(article))
  )
}
function buildCommandeArticleView(article){
  const articlebox = document.createElement('div')
  articlebox.classList.add('article_commande')
  articlebox.id = `article_commande_${article.id}`
  const nombox = document.createElement('span')
  nombox.classList.add('nom_article_commande')
  articlebox.appendChild(nombox)
  nombox.innerText = article.nom
  const prixbox = document.createElement('span')
  prixbox.classList.add('prix_article_commande')
  articlebox.appendChild(prixbox)
  prixbox.innerText = article.prix
  return articlebox
}