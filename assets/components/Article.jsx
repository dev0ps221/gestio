class Article extends React.Component{
    constructor(props){
        super(props)
        this.state = {...props}
    }
    render(){
        return <li className="article-menu" key={this.state.key}>
            {this.state.nom}                    
            <ul className='infos-article-menu'>
                <li>
                   <img src={this.state.illu}/>                    
                </li>
                <li>
                   {this.state.nom}                    
                </li>
                <li>
                   {this.state.prix} FCFA                    
                </li>
            </ul>
        </li>
    }
    
}
