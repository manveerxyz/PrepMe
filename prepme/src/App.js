import React from 'react';

import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';

// import LoginBox from './react-components/LoginBox';
import Login from './react-components/Login';
import Home from './react-components/Home';

import { readCookie } from "./actions/users";

class App extends React.Component {

    constructor(props) {
        super(props);
        readCookie(this); // sees if a user is logged in.
    }

    state = {
        currentUser: null,
        isAdmin: false,
        events: [
            {course:"CSC309", subject:"Midterm", username:"rayanaazar", description:"We will be reviewing all of the midterm material from Week 1 to Week 6. We will then go over the important tutorial problems and finally cover past midterm questions that were posted. ", location:"BA3200", date:"2020-02-26", time:"14:00", size:"1-5", members:[]},
            {course:"CSC321", subject:"Final Exam", username:"manveerbasra", description:"In preparation for the final exam, we will be reviewing all of the lecture material in this session excluding Linear and Logistic Regression. Following sessions will focus on tutorial and assignment questions, and the practice finals. ", location:"MP102", date:"2020-03-20", time:"12:00",size:"6-10", members:[]},
            {course:"CSC263", subject:"Assignment 2", username:"lucasfenau", description:"The second assignment is meant to be done in groups of 3-5 so we will get started on the questions in this session. If parts of the assignment are not completed by the end of this session, we will assign the remaining work amongst the team", location:"BA2270", date:"2020-02-18", time:"16:00",size:"1-5", members:[]},
            {course:"CSC343", subject:"Midterm", username:"juliequinn", description:"Databases has a history of having difficult and obscure questions on midterms, so we will attempt to cover some of these questions from previous midterms in this session. ", location:"Robarts 11th Floor Harbord 3", date:"2020-03-02", time:"15:00",size:"6-10", members:[]}
        ],
        users: [
            {username: "user", password: "user", rating: 4, isAdmin: false},
            {username: "rayanaazar", password: "password", rating: 4, isAdmin: false},
            {username: "manveerbasra", password: "password", rating: 3, isAdmin: false},
            {username: "admin", password: "admin", isAdmin: true}
        ]
    };

    setEvents = (events) => {
        this.setState({
            events: events
        })
    };

    routing() {
        if (!this.state.currentUser) {
            return(<div>
                            <Login 
                                app={this}
                            />
            </div>)
            // return(
            //     <Switch>
            //         <Route exact path='/login' render={() =>
            //             (<div>
            //                 <Login 
            //                     app={this}
            //                     doLogin={this.doLogin}
            //                     doSignUp={this.doSignUp}
            //                     isLoggedIn={this.state.isLoggedIn}
            //                     users={this.state.users} 
            //                 />
            //             </div>)}>
            //         </Route>
            //         <Route path='/'>
            //             <Redirect to='/login'/>
            //         </Route>
            //     </Switch>
            // )
        } else {
            return(<Home 
                            app={this}
                            state={this.state} 
                            setEvents={this.setEvents} 
                        />)
            // return(
            //     <Switch>
            //         <Route path='/home' render={() =>
            //             (<Home 
            //                 state={this.state} 
            //                 doLogout={ this.doLogout } 
            //                 setEvents={this.setEvents} 
            //                 doChangePassword={this.doChangePassword} 
            //                 adminChangePassword={this.adminChangePassword}
            //             />)}>
            //         </Route>
            //         <Route path='/'>
            //             <Redirect to='/home'/>
            //         </Route>
            //     </Switch>
            // )
        }
    }
    
    render() {
        return (
            <div>
                <BrowserRouter>
                    {this.routing()}
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
