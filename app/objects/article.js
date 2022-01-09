const  path  = require("path")
const dbactions = require(path.join(__dirname,'actions?.js'))
class Article{
  getData(){
    return this.data
  }
  setData(cb){
    this.db.getArticle({id:this.id,nom:this.nom},(err,data)=>{
      this.data = data
      if(cb)cb(this.getData())
    })
  }
  get(){
    return this.data && this.data.length ? this.data[0] : this.data
  }
  constructor(db,data){
    this.db = db
    this.id = data.id
    this.name = data.nom
    this.price = data.prix
    this.data = data
    this.setData()
  }
}
class Articles{
  configureDeebee(){
    const actions = dbactions.Articles
    actions.forEach(
      action=>{
        const actionname = action[0]
        const callback = action[1]
        this.db._____registerAction(actionname,callback)
      }
    )
  }
  getArticles(cb){
    this.setArticles(
      ()=>{
        if(cb)cb(this.articles.map(article=>article.get()))
      }
    )
    return this.articles.map(article=>article.get())
  }
  setArticles(cb){
    this.db.getArticles((err,articles)=>{
      articles = articles?articles:[]
      this.articles = articles ? [] : this.articles
      articles.forEach(
        article=>{
          this.articles.push(new Article(this.db,article))
        }
      )
      if(cb)cb(this.db.getArticles())
    })
  }
  insertArticle(data,cb){
    this.db.addArticle(
      data,(e,r)=>{
        this.setArticles(
          ()=>{
            cb(e,r)
          }
        )
      }
    )
  }
  constructor(db){
    this.db = db
    this.configureDeebee()
    this.articles = []
    this.setArticles()
  }
}
module.exports = {
  Articles,Article
}
