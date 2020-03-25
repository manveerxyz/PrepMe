// Functions to help with user actions.

// A function to check if a user is logged in on the session cookie
export const readCookie = (app) => {
  const url = "http://localhost:5000/users/check-session";

  fetch(url)
      .then(res => {
          if (res.status === 200) {
              console.log("read")
              return res.json();
          }
      })
      .then(json => {
          if (json && json.currentUser) {
              app.setState({ currentUser: json.currentUser });
          }
      })
      .catch(error => {
          console.log(error);
      });
};

// Get a list of all user objects with just their name and rating
export const getUsersNameAndRating = (homeComp) => {
    const url = 'http://localhost:5000/users'; // This is only for dev purposes when react is running on a different port than the server
    // const url = '/users' // Switch to this line for actual build

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            homeComp.setState({
                users: json,
                filteredUsers: json
            });
        })
        .catch(error => {
            console.log(error);
            homeComp.setState({
                users: [],
                filteredUsers: []
            });
        });
}

// A function to send a POST request with the user to be logged in
export const login = (loginComp, app) => {
  const { username, password } = loginComp.state

  const newUser = {
    username,
    password
  }

  console.log(newUser)
  console.log(JSON.stringify(newUser))

  // Create our request constructor with all the parameters we need
  const request = new Request("http://localhost:5000/users/login", {
      method: "post",
      body: JSON.stringify(newUser),
      headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
      }
  });

  // Send the request with fetch()
  fetch(request)
      .then(res => {
          if (res.status === 200) {
            loginComp.setState({ invalidCredentials: false })
            return res.json();
          }
      })
      .then(json => {
          if (json.username !== undefined) {
              app.setState({ currentUser: json.username });
          }
          if (json.isAdmin !== undefined) {
            app.setState({ isAdmin: json.isAdmin })
          }
      })
      .catch(error => {
          console.log(error);
          loginComp.setState({ invalidCredentials: true })
      });
};

// A function to send a POST request with the user to be created
export const signUp = (signUpComp, app) => {
  const { username, password } = signUpComp.state

  const newUser = {
    username,
    password
  }
  // Create our request constructor with all the parameters we need
  const request = new Request("http://localhost:5000/users", {
      method: "post",
      body: JSON.stringify(newUser),
      headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
      }
  });

  // Send the request with fetch()
  fetch(request)
      .then(res => {
          if (res.status === 200) {
            signUpComp.setState({ invalidCredentials: true })
            return res.json();
          }
      })
      .then(json => {
        // I don't think we need to do anything
          // if (json.currentUser !== undefined) {
          //     app.setState({ currentUser: json.currentUser });
          // }
      })
      .catch(error => {
          console.log(error);
          signUpComp.setState({ invalidCredentials: true })
      });
};


// A function to send a GET request to logout the current user
export const logout = (app) => {
  const url = "http://localhost:5000/users/logout"

  fetch(url)
      .then(res => {
          app.setState({
              currentUser: null,
          });
      })
      .catch(error => {
          console.log(error);
      });
};