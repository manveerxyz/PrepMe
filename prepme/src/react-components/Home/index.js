import React from "react";

import "./styles.css";
import { Redirect } from 'react-router-dom';
import LeftSideBar from "../LeftSideBar/index";
import MainComponent from "../MainComponent/index";
import RightSideBar from "../RightSideBar/index";

/* Component for the Home page */
class Home extends React.Component {
  state = {
    onEventsPage: true,
    editingEvent: false
  }

  setOnEventsPage = (newValue) => {
    this.setState({ onEventsPage: newValue })
  }

  render() {
    const { state, doLogout, doChangePassword } = this.props
    const { isLoggedIn, username, isAdmin, events } = state
    if (!isLoggedIn) return <Redirect to='/login' />

    return (
      <div className="home-div">
        <LeftSideBar 
          username={ username }
          isAdmin={ isAdmin } 
          doLogout={ doLogout }
          onEventsPage={ this.state.onEventsPage }
          setOnEventsPage={ this.setOnEventsPage }
        />
      
        <MainComponent
            username={username}
          events={events}
          setEvents = {this.props.setEvents}
        />

        <RightSideBar 
          isAdmin={ isAdmin } 
          onEventsPage={ this.state.onEventsPage }
          editingEvent={ this.state.editingEvent }
          doChangePassword={ doChangePassword }
        />
      </div>
    );
  }
}

export default Home;