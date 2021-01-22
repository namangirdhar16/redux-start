import React from 'react';

import { BrowserRouter , Route  , Link } from 'react-router-dom';
import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header.js';
//client id 344557030320-fkiainv6g1f082pib8aeafvtkfsu9p56.apps.googleusercontent.com
export default class App extends React.Component {
    
    componentDidMount()
    {
        window.gapi.load('client:auth2' , () => {
            window.gapi.client.init({
                clientId : '344557030320-fkiainv6g1f082pib8aeafvtkfsu9p56.apps.googleusercontent.com',
                scope : 'email',
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({
                    isSignedIn: this.auth.isSignedIn.get(),
                })
            })
        });
    }
    renderAuthButton()
    {
        if(this.state.isSignedIn === null)
        {
            return <div>I don't know</div>
        }
        else if(this.state.isSignedIn === true)
        {
            return <div>You're signed in</div>;
        }
        else
        return <div>You're not signed in</div>;
    }
    render()
    {
        return (
            <div className = "container">
               <BrowserRouter>
                   <Header />
                   <Route path = "/" exact component = {StreamList} />
                   <Route path = "/streams/new" exact component = {StreamCreate} />
                   <Route path = "/streams/edit" exact component = {StreamEdit} />
                   <Route path = "/streams/delete" exact component = {StreamDelete} />
                   <Route path = "/streams/show" exact component = {StreamShow} />
               </BrowserRouter>
            </div>
        )
    }
}