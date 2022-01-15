const  path  = require("path")
const dbactions = require(path.join(__dirname,'actions?.js'))

class MenuElem {
  constructor({nom,prix,id}) {
    this.nom = nom
    this.prix = prix
    this.id = id
  }
  getPrix(){
    return this.prix
  }
}
class Menu {
  addMenuElems(elems){
    elems.forEach(
      (elem)=>this.addMenuElem(elem)
    )

  }
  addMenuElem(data){
    this.elements.push(
      new MenuElem(data)
    )
  }
  getMenuElem(name){
    let found = false
    this.elements.forEach(
      elem=>{
        if(elem.nom === name) found = elem
      }
    )
    return found
  }
  get(){
    return this.getData() && this.getData().length ? this.getData()[0] : this.getData()
  }
  setData(data){
    if(data){
      this.data    = data
      this.id      = data.id 
      this.nom     = data.nom
      this.data.articles = this.elements
    }
  }
  getData(){
    let data = this.data
    data.articles = this.elements
    return data
  }
  updateData(cb=null){
    this.db.getMenu(
      {nom:this.nom,id:this.id},data=>{
        this.db.getArticlesMenu(
          {id_menu:this.id},(e,r)=>{
            if(e){
              console.log(e)
            }else{
              let elements = []
              r.forEach(
                (menuelem,idx)=>{
                  this.db.getArticleMenu(
                    menuelem,(er,re)=>{
                      if(re&&re.length)elements.push(re[0])
                      else{
                        console.log(er)
                      }
                      if(idx+1==r.length){
                        this.addMenuElems(elements)
                      }
                    }
                  )
                }         
              )

            }
            this.setData(data)
          }
        )
        this.setData(data)
      }
    )
    if(cb)cb(this.get())
  }
  constructor(data,db){
    this.db = db
    this.setData(data)
    this.elements = []
    this.updateData()
  }
}

class Menus{

  insertMenuArticle(data,cb){
    this.db.addArticleMenu(
      data,cb
    )
  }

  insertMenu(data,cb){
    this.db.addMenu(
      data,(e,r)=>{
        this.setMenus(
          ()=>{
            cb(e,r)
          }
        )
      }
    )
  }
  configureDeebee(){
    const actions = dbactions.Menus
    actions.forEach(
      action=>{
        const actionname = action[0]
        const callback = action[1]
        this.db._____registerAction(actionname,callback)
      }
    )
  }
  addMenu(data){
    this.menus.push(
      new Menu(data,this.db)
    )
  }
  getById(id){
    let found = false
    this.menus.forEach(
      elem=>{
        if(elem.id === id) found = elem
      }
    )
    return found
  }
  getMenu(name){
    let found = false
    this.menus.forEach(
      elem=>{
        if(elem.nom === name) found = elem
      }
    )
    return found
  }
  getMenus(cb){
    this.setMenus(
      ()=>{
        if(cb)cb(this.menus.map(menu=>menu.get()))
      }
    )
    return this.menus.map(menu=>menu.get())
  }
  setMenus(cb){
    this.db.getMenus((err,menus)=>{
      menus = menus?menus:[]
      this.menus = menus ? [] : this.menus
      this.addMenus(menus)
      if(cb)cb(this.db.getMenus())
    })
  }
  addMenus(menus){
    menus.forEach(
      (menu)=>{
        this.addMenu(menu)
      }
    )
  }
  constructor(db,menus) {
    this.menus = []
    this.db = db
    this.configureDeebee()
    this.setMenus(
      ()=>{

      }
    )
  }
}

module.exports = {
  Menu,MenuElem,Menus
}
