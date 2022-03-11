class Admin extends React.Component{


    constructor(props){
        super(props)
        window.adminPage = this
        this.state = {...props}
        if (!iLI()){
            document.location.href ='/login'
        }

    }

    render(){
        return <AdminFeed id='admin'>
            <AdminMenus key='adminmenus' id='adminmenus'/>
        </AdminFeed>
    }
}