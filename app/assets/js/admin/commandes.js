
  window.addEventListener(
    'load',
    ()=>{
    
      let commande_date_interval = null
      post(
        '/commandes'
      )

      function updateCommandesView(){

        liste_commandes.innerHTML = ''
        commandes.forEach(
          commande=>{
            const commandelem = document.createElement('div')
            commandelem.classList.add('commande')
            const uuid = document.createElement('span')
            uuid.classList.add('uuid')
            uuid.innerText = commande.uuid
            liste_commandes.appendChild(commandelem)
            const commandeinfos = document.createElement('div')
            const articleselem = document.createElement('div')
            commande.articles.forEach(
              article=>{
                const articleelem = document.createElement('div')
                articleelem.classList.add('article-commande')
                const name = document.createElement('span')
                name.classList.add('article-commande-name')
                name.innerText = article.name
                
                const quantity = document.createElement('span')
                quantity.classList.add('article-commande-quantity')
                quantity.innerText = `${article.quantity}`
                
                const price = document.createElement('span')
                price.classList.add('article-commande-price')
                price.innerText = article.price
                commandelem.appendChild(articleelem)
              }

            )
            commandelem.addEventListener(
              'click',e=>{
                setSelectedCommand(commande)
              }
            )
            commandelem.appendChild(uuid)
            liste_commandes.appendChild(commandelem)
          }
        )
      }

      function setSelectedCommand(command){
        commande_selected = command
        updateDetailsCommande()
      }

      function updateDetailsCommande(){

        if(commande_selected){

            clearInterval(commande_date_interval)
            details_commande.innerHTML = ""
            const uuid =document.createElement('div')
            uuid.classList.add('commande-uuid')
            uuid.innerHTML = `commande [[${commande_selected.uuid}]]`
            
            const date = document.createElement('div')
            date.classList.add('commande-date')
            date.classList.add('commande-info')
            
            
            const datelabel = document.createElement('div')
            datelabel.classList.add('infolabel')
            datelabel.innerText = ''
            const datedata = document.createElement('div')
            datedata.classList.add('infodata')
            function updateTimer(){
                let secondssince = ((new Date().getTime() - new Date(commande_selected.date).getTime())/1000)
                let mnssince = parseInt(secondssince/60)
                let hourssince = parseInt(secondssince/60/60)
                let dayssince = parseInt(secondssince/60/60/24)
                secondssince = parseInt(secondssince)
                datedata.innerText = `${dayssince?dayssince+'days ':''}${hourssince?dayssince ? parseInt(hourssince-dayssince*24)+'hrs ' : hourssince +'hrs ':''}${mnssince?hourssince ? parseInt(mnssince-hourssince*60)+"mns " : mnssince+'mns ':' '}${secondssince? mnssince ? parseInt(secondssince-mnssince*60)+'s' :  secondssince:''}`
            }
            updateTimer()
            commande_date_interval = setInterval(
                ()=>{
                    updateTimer()
                },1000
            )
            
            const articles = document.createElement('div')
            articles.classList.add('commande-articles')
            articles.classList.add('commande-info')
            

            const articleslabel = document.createElement('div')
            articleslabel.classList.add('infolabel')
            articleslabel.innerText = 'articles :'
            const articlesdata = document.createElement('div')
            articlesdata.classList.add('infodata')
            articlesdata.innerText = commande_selected.articles
            

            date.appendChild(datelabel)
            date.appendChild(datedata)

            articles.appendChild(articleslabel)
            articles.appendChild(articlesdata)

            
            details_commande.appendChild(uuid)
            details_commande.appendChild(date)
            details_commande.appendChild(articles)
        }


      }


      window.commandes = []
      window.commande_selected = null

      get('/commandesRes',data=>{
        commandes = []
        data.forEach(
          commande=>{
            commandes.push(commande)
          }
        )
        updateCommandesView()
      })
    }


  )