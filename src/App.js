import React, { Component, Fragment } from "react";
import "./index.min.css";
import MainView from "./components/MainView";
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
      <div className="bg-dark">
        <div className="">
          {this.state.page === "landing" ? (
            <div className="landing">
              <div className="landing-inner dark-overlay">
                <div className="buttons">
                  <button
                    className="btn btn-primary"
                    onClick={() => this.setState({ page: "strategy" })}
                  >
                    Strategy
                  </button>
                  <button
                    className="btn"
                    onClick={() => this.setState({ page: "alliance" })}
                  >
                    Alliance Selection
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="main container">
              {this.state.match_data.length === 0 ? (
                <div className="primary-view">
                  <div className="selectors text-light">
                    <h1>Loading...</h1>
                  </div>
                </div>
              ) : (
                <Fragment>
                  {this.state.page === "strategy" ? (
                    <MainView
                      scout_data={this.state.scout_data}
                      match_data={this.state.match_data}
                    />
                  ) : (
                    <AllianceView
                      scout_data={this.state.scout_data}
                      match_data={this.state.match_data}
                    />
                  )}
                </Fragment>
              )}
            </div>
          )}
        </div>
        <div className="footer">
          <button
            className={"refresh"}
            onClick={() => this.setState({ page: "landing" })}
          >
            <i className="fas fa-home" />
          </button>
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
