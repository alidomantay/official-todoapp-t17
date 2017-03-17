import React, { PropTypes } from 'react';
import SignupForm from '../components/Signup';
import AuthApi from '../api/AuthApi';
import _ from 'lodash';

class SignupContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            user: {},
            error: false,
            isLoading: false
        }
        this.updateState = this.updateState.bind(this);
        this.onSignup = this.onSignup.bind(this);
    }

    componentWillMount(){
        this.setState({isLoading:true});
        AuthApi.onGetUser().then(res=>{
            this.setState({isLoading:false});
            if(res.data.response){
                this.context.router.push('/todos');
            } else {
                this.context.router.push('/signup');
            }
        });
    }

    updateState(e) {
        const field = e.target.name;
        let user = this.state.user;
        user[field] = e.target.value;
        this.setState({ user: user });
    }

    extractErrors(errs,elems) {
        let errField = document.getElementById('errField');
        let errMsg='';
        _.forEach(errs,(value,key)=>{
            elems[key].parentNode.classList.add('error');
            errMsg+=`<p>- ${value.message}</p>`;
            errField.insertAdjacentHTML('afterend',errMsg);
        });
    }

    onSignup(e) {
        e.preventDefault();
        const elems = e.target.elements;
        _.forEach(elems,(value,key)=>{
            elems[key].parentNode.classList.remove('error');
        });
        AuthApi.onSignup(this.state.user).then((res) => {
            console.log(res.data); //access data here //check the console
            if (res.data.success === false) {
                this.setState({error:true});
                if(res.data.response.errors){
                    this.extractErrors(res.data.response.errors,elems);
                    return;
                }
                alert(res.data.response.message);
                return
            }
            alert("Great! Just wait till you get redirected");
            setTimeout(()=>{
                window.location='/';
            },2000)
        }).catch(err => {
            throw (err);
            alert(err);
        });
    }

    render() {
        return (
            <SignupForm
                error={this.state.error}
                onChange={this.updateState}
                onSignup={this.onSignup}
            />
        )
    }
}

SignupContainer.contextTypes={
    router: PropTypes.object.isRequired
};

export default SignupContainer;