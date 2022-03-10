class Home extends React.Component{

    constructor(props){
        super(props)
        window.homeComp = this
    }

    state = {
        menus:[
            {articles:[{content:'hi'}]}
        ]
    }
    

    render(){
        return <HomeContainer menus={this.state.menus} />
    }

    
}