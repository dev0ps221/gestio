const  path  = require("path")
const dbactions = require(path.join(__dirname,'actions?.js'))

class MenuElem {
  constructor(nom,prix) {
    this.nom = nom
    this.prix = prix
  }
  getPrix(){
    return this.prix
  }
}
class Menu {
  addMenuElems(elems){
    elems.forEach(
      ([nom,prix])=>this.addMenuElem(elem)
    )
  }
  addMenuElem(nom,prix){
    this.elements.push(
      new MenuElem(nom,prix)
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
  constructor(name,elems=[]){
    this.nom     = name
    this.elements = []
    this.addMenuElems(elems)
  }
}

class Menus{
  configureDeebee(){
    const actions = dbactions.Menus
    console.log('menu actions')
    console.log(actions)
    actions.forEach(
      action=>{
        const actionname = action[0]
        const callback = action[1]
        this.db._____registerAction(actionname,callback)
      }
    )
  }
  addMenu(nom,elems){
    this.menus.push(
      new Menu(nom,elems)
    )
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
  addMenus(menus){
    menus.forEach(
      ({nom,elems})=>{
        this.addMenu(name,elems)
      }
    )
  }
  constructor(db,menus) {
    this.menus = []
    this.db = db
    this.configureDeebee()
  }
}

module.exports = {
  Menu,MenuElem,Menus
}
