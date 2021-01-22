import React from 'react';

import { connect } from 'react-redux';
import { signIn , signOut } from '../actions';

 class GoogleAuth extends React.Component {
    // state = { isSignedIn : null};
     componentDidMount()
    {
        window.gapi.load('client:auth2' , () => {
            window.gapi.client.init({
                clientId : '344557030320-fkiainv6g1f082pib8aeafvtkfsu9p56.apps.googleusercontent.com',
                scope : 'email',
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        });
    }
    onAuthChange = (isSignedIn)=>
    {
        if(isSignedIn)
        {
            this.props.signIn();
        }
        else
        this.props.signOut();

    }
    renderAuthButton()
    {
        if(this.props.isSignedIn === null)
        return (<div>I don't know if we are signed in or not</div>);
        else if(this.props.isSignedIn === true)
        {
            return <button className = "btn btn-success" onClick = {this.onSignOutClick}>Sign Out</button>;
        }
        else
        return <button className = "btn btn-danger" onClick = {this.onSignInClick}>Sign In </button>;
    }
    onSignInClick = () => {
        this.auth.signIn();

    }
    onSignOutClick = () => {
        this.auth.signOut();
    }
    render()
    {
        return (<div>
            {this.renderAuthButton()}
        </div>);
    }
}


const mapStateToProps = (state) => {
    console.log(state);
    return {
        isSignedIn : state.authReducer.isSignedIn
    }
        
   
}

export default connect(mapStateToProps , { 
    signIn , signOut
})(GoogleAuth);
