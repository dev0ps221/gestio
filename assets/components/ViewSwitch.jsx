class ViewSwitch extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            view:props.view
        }
    }
 
    renderView(view,key){
        if(view.key==this.state.view) return view
        else return ""
    }

    render(){
        return <React.Fragment>
            <ul>
                {this.props.children}
            </ul>
        </React.Fragment>
    }
}