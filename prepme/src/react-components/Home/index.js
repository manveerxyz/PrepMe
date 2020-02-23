import React from "react";

import "./styles.css";
import EventCard from "../EventCard/index";
import LeftSideBar from "../LeftSideBar/index";
import MainComponent from "../MainComponent/index";
import RightSideBar from "../RightSideBar/index";

/* Component for the Home page */
class Home extends React.Component {
  state = {
    onEventsPage: true
  }

  render() {
    const { username, isAdmin, events } = this.props.state
    return (
      <div className="home-div">

        <LeftSideBar 
          username={ username }
          isAdmin={ isAdmin } 
          onEventsPage={ this.state.onEventsPage } 
        />
        <MainComponent />
        <RightSideBar 
          onEventsPage={ this.state.onEventsPage }
        />
      </div>
    );
  }
}

export default Home;