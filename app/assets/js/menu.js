
window.liste_menus = document.querySelector('#menu #liste_menus')
window.menus = []
function buildMenuArticleBox(article){
  const articlebox = document.createElement('div')
  articlebox.classList.add('article')

  const databox = document.createElement('div')
  databox.classList.add('data')

  const nombox = document.createElement('div')
  nombox.classList.add('nom')
  nombox.innerText = article.nom
  databox.appendChild(nombox)

  const prixbox = document.createElement('div')
  prixbox.classList.add('prix')
  prixbox.innerText = article.prix
  databox.appendChild(prixbox)
  
  const actionsbox = document.createElement('div')
  actionsbox.classList.add('actions')

  const addaction = document.createElement('span')
  addaction.classList.add('action')

  addaction.innerHTML = "<span class='content'>+  ajouter</span>"
  actionsbox.appendChild(addaction)
  addaction.addEventListener(
    'click',e=>{
      const occurence = commande_actuelle.voirArticle(article.id)
      !occurence?commande_actuelle.ajouterArticle(article):occurence.increase(()=>{
        updateCommandeView()
      })
      updateCommandeView()
    }
  )
  
  const seeaction = document.createElement('span')
  seeaction.classList.add('action')

  seeaction.innerHTML = "<span class='content'>..  details</span>"
  actionsbox.appendChild(seeaction)
  
  articlebox.appendChild(databox)
  articlebox.appendChild(actionsbox)

  return articlebox
}

function buildMenuArticlesBox(articles){
  const articlesbox = document.createElement('div')
  articlesbox.classList.add('liste_articles')
  articles.forEach(
    article=>articlesbox.appendChild(buildMenuArticleBox(article))
  )
  return articlesbox
}

function buildMenuBox(menu){

  const {nom,id,articles}  = menu
  let menubox    = document.createElement('div')
  let nombox        = document.createElement('div')

  nombox.innerText  = nom
  menubox.id = `menu${id}`
  menubox.classList.add('menu')
  nombox.classList.add('nom')

  menubox.appendChild(nombox)
  menubox.appendChild(buildMenuArticlesBox(articles))
  return menubox

}


function  updateMenusView(){
  liste_menus.innerText = ""
  menus.forEach(
    menu=>{
      const {articles} = menu
      if(articles&&articles.length){
        liste_menus.appendChild(buildMenuBox(menu))
      }
    }
  )
}


get(
  '/menusRes',data=>{
    menus = []
    data.forEach(
      menu=>{
        menus.push(menu)
      }
    )
    updateMenusView()
  }
)


get('/menusRes',data=>{
    menus = []
    data.forEach(
      menu=>{
        menus.push(menu)
      }
    )
    console.log(menus)
    updateMenusView()
  })
post(
    '/menus'
)