import React, { Component, Fragment } from "react";
import "./index.min.css";
import MainView from "./components/MainView";
import AllianceView from "./components/AllianceView";
import { FetchAllTeams, FetchMatchData } from "./Utils";
import { Provider } from "react-redux"; // Wrap everything in this so all components have access to the store
import store from "./store";
import { loadUser } from "./actions/auth";

import setAuthToken from "./utils/setAuthToken";

// Check if there's a token, always send it in a global header
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      res: "",
      resClass: "",
      access_token: "",
      match_data: [],
      scout_data: [],
      page: "landing"
    };

    this.Update = this.Update.bind(this);

    this.Update();
  }

  Update() {
    FetchAllTeams(
      res => {
        console.log("TEAM DATA");
        console.log(res);
        this.setState(
          {
            scout_data: res
          },
          () => {
            FetchMatchData(
              res => {
                console.log(res);
                this.setState({
                  res: "Success",
                  resClass: "success",
                  match_data: res
                });
              },
              err => {
                console.error(err);
                this.setState({ res: "Failed: " + err });
              }
            );
          }
        );
      },
      err => {
        console.error(err);
        this.setState({ res: "Failed: " + err, resClass: "danger" });
      }
    );
  }

  render() {
    return (
      <Provider store={store}>
        <Fragment>

</Fragment>
        </Provider>
      );
  }
}
