import React, { Component, Fragment } from "react";

import { FetchAllTeams, FetchSingleTeam } from "./Utils";

import SyncIcon from "@material-ui/icons/Sync";

export default class MainView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      res: "unknown",
      access_token: "",
      scout_data: {}
    };

    this.Update = this.Update.bind(this);

    this.Update();
  }

  Update() {
    FetchAllTeams(
      res => {
        console.log(res);
        this.setState({ scout_data: res.data, res: "Success!" });
      },
      err => {
        this.setState({ res: "Failed: " + err });
      }
    );
  }

  render() {
    console.log(this.state.scout_data);
    return this.state.scout_data.data == null ? (
      <Fragment>
        <h1>Loading...</h1>
      </Fragment>
    ) : (
      <div className="primary-view">
        <h6>{this.state.res}</h6>
        <select type="select">
          {this.state.scout_data.data == null ? (
            <option name="NULL">""</option>
          ) : (
            this.state.scout_data.data.entries.map((x, i) => (
              <option key={i}>
                {x.Team_Number} {x.Team_Name}
              </option>
            ))
          )}
        </select>
        <select type="select">
          {this.state.scout_data.data == null ? (
            <option name="NULL">""</option>
          ) : (
            this.state.scout_data.data.entries.map((x, i) => (
              <option key={i}>
                {x.Team_Number} {x.Team_Name}
              </option>
            ))
          )}
        </select>
        <select type="select">
          {this.state.scout_data.data == null ? (
            <option name="NULL">""</option>
          ) : (
            this.state.scout_data.data.entries.map((x, i) => (
              <option key={i}>
                {x.Team_Number} {x.Team_Name}
              </option>
            ))
          )}
        </select>
        <ul></ul>
        <button onClick={this.Update}>
          <SyncIcon /> Refresh
        </button>
      </div>
    );
  }
}
