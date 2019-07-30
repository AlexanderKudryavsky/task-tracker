import React from 'react';
import {Field, reduxForm} from "redux-form";
import './Login.scss'
import {connect} from 'react-redux';
import {
    onLoginThunkCreator
} from "./../../redux/authReducer";
import {Redirect} from "react-router-dom";

let LoginForm = (props) => {
    if(props.user){
        return <Redirect to={'/'}/>
    }
    return(
            <form  onSubmit={props.handleSubmit}>
                <div>
                    <Field className={'login-form-field'} placeholder={'Login'} name={'login'} component={'input'}/>
                </div>
                <div>
                    <Field className={'login-form-field'} placeholder={'Password'} name={'password'} component={'input'} type={'password'}/>
                </div>
                <div>
                    <Field className={'login-form-checkbox'} component={'input'} name={'rememberMe'} type='checkbox'/> remember me
                </div>
                <div>
                    <button className={'login-form-btn'}>Login</button>
                </div>
            </form>

    )
};

LoginForm = reduxForm({
    form: 'login'
})(LoginForm);


const Login = (props) => {
    const submit = (formData) => {
        console.log(formData);
        props.onLoginThunkCreator(formData);
    };
    return(
        <div className={'login-form'}>
            <div className={'exampleUser'}>
                <div>Login: test</div>
                <div>Password: 12345</div>
            </div>
            <h2>Login</h2>
            <LoginForm onSubmit={submit} user={props.user}/>
        </div>
    )
};

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    user: state.auth.user
});

export default connect(mapStateToProps, {onLoginThunkCreator})(Login);