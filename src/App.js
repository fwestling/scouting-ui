import React, { Component, Fragment } from "react";
import "./index.min.css";
import MainView from "./components/MainView";
import Landing from "./components/Landing";
import { HashRouter, Route, Switch } from "react-router-dom";
import AllianceView from "./components/AllianceView";
import { FetchAllTeams, FetchMatchData } from "./Utils";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      res: "",
      resClass: "",
      access_token: "",
      match_data: [],
      scout_data: []
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
      <div className="bg-dark">
        <div className="bg-dark">
          <HashRouter basename="/">
            <Route exact path="/" component={Landing} />
            <div className="main container">
              {this.state.match_data.length === 0 ? (
                <div className="primary-view">
                  <div className="selectors">
                    <h1>Loading...</h1>
                  </div>
                </div>
              ) : (
                <Switch>
                  <Route
                    exact
                    path="/strategy"
                    render={props => (
                      <MainView
                        {...props}
                        scout_data={this.state.scout_data}
                        match_data={this.state.match_data}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/alliance"
                    render={props => (
                      <AllianceView
                        {...props}
                        scout_data={this.state.scout_data}
                        match_data={this.state.match_data}
                      />
                    )}
                  />
                </Switch>
              )}
            </div>
          </HashRouter>
        </div>
        <div className="footer">
          <button
            className={"refresh refresh-" + this.state.resClass}
            onClick={this.Update}
          >
            <i className="fas fa-sync" />
          </button>
        </div>
      </div>
    );
  }
}
