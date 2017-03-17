import React, { PropTypes } from 'react';
import AuthApi from '../api/AuthApi';
import Login from '../components/Login';

class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:{},
            isLoading: false
        }
        this.updateState = this.updateState.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }

    componentWillMount(){
        this.setState({isLoading:true});
        if(this.props.routeParams.mode){
            this.setState({isLoading:false});
            alert('Please login first');
            return;
        }
        AuthApi.onGetUser().then(res=>{
            this.setState({isLoading:false});
            if(res.data.response){
                this.context.router.push('/todos');
            } else {
                this.context.router.push('/');
            }
        });
    }

    updateState(e) {
        const field = e.target.name;
        let user = this.state.user;
        user[field] = e.target.value;
        this.setState({ user: user });
    }

    onLogin(e){
        e.preventDefault();
        AuthApi.onLogin(this.state.user).then((res) => {
            const data = res.data;
            if (data.success === true) {
                this.setState({
                    user: data.response._id
                });
                window.location = res.data.redirect;
                return;
            }
            alert(res.data.response);
        }).catch((err) => {
            throw (err);
        });
    }
    render(){
        return(
            <Login 
                onChange={this.updateState}
                onLogin={this.onLogin}
            />
        );
    }
}

LoginContainer.contextTypes={
    router: PropTypes.object.isRequired
};

export default LoginContainer;