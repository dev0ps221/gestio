class AdminArticles extends React.Component{

    constructor(props){
        super(props)
        this.state = {...props}
    }

    renderArticles(){
        return <ul className="admin-articlelist">
            {(this.state.articles ? this.state.articles : []).map(
                (m,k)=>this.renderArticle(m,k)
            )}
        </ul>
    }
    
    renderArticle(article,key){
        return <li key={key} className="article">
            {article}
        </li>
    }

    render(){

        return <React.Fragment>
            <h1>
                Articles
            </h1>
            {this.renderArticles()}
        </React.Fragment>

        
    }

}