class Article extends React.Component{
    constructor(props){
        super(props)
        this.state = {...props}
    }
    render(){
        return <li className="article-menu" key={this.state.key}>
            <h1>
                {this.state.nom}                    
            </h1>
            <ul className='infos-article-menu'>
                <li className="illu">
                   <img src={this.state.illu}/>                    
                </li>
                <li>
                   {this.state.prix} FCFA                    
                </li>
            </ul>
        </li>
    }
    
}
