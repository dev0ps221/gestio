function fieldBox(elem){
    return <div className="champs">
        {elem}
    </div>
}
class InputField extends React.Component{
    constructor(props){
        super(props)
        this.state = {...props}
      }
    render(){
        return fieldBox(React.createElement('input',this.state)) 
    }
}
class ButtonField extends React.Component{
    constructor(props){
        super(props)
        this.state = {...props}
    }
    render(){
        return fieldBox(React.createElement('button',this.state,this.state.txt))
    }
}