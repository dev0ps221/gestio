class AdminCommandes extends React.Component{

    constructor(props){
        super(props)
        this.state = {...props}
    }

    renderCommandes(){
        return <ul className="admin-commandelist">
            {(this.state.commandes ? this.state.commandes : []).map(
                (m,k)=>this.renderCommande(m,k)
            )}
        </ul>
    }
    
    renderCommande(commande,key){
        return <li key={key} className="commande">
            {commande}
        </li>
    }

    renderNewCommande(){
        return <NewCommande>
            <h1>
                Ajouter Une Commande
            </h1>
        </NewCommande>
    }

    render(){

        return <React.Fragment>
            <h1>
                Commandes
            </h1>
            {this.renderNewCommande()}
            {this.renderCommandes()}
        </React.Fragment>

        
    }

}