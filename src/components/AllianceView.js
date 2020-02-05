import React, { Component, Fragment } from "react";

import { FetchAllTeams, FetchMatchData } from "../Utils";

import SyncIcon from "@material-ui/icons/Sync";

export default class AllianceView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      res: "",
      resClass: "",
      access_token: "",
      loading: false,
      scout_data: [],
      match_data: [],
      available: []
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
      <div className="primary-view">
        {this.state.match_data.length === 0 ? (
          <Fragment>
            <h1>{this.state.res || "Loading..."}</h1>
          </Fragment>
        ) : (
          <Fragment>
            <div className="allianceSelection">
              <table>
                <thead>
                  <th>Team number</th>
                  <th>Team name</th>
                  <th>Score</th>
                  <th></th>
                </thead>
                <tbody>
                  {this.state.scout_data.map((team, idx) => (
                    <tr key={idx}>
                      <td>team.number</td>
                      <td>team.name</td>
                      <td>0</td>
                      <td>
                        <button className="btn btn-primary" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Fragment>
        )}
        <button
          className={"refresh refresh-" + this.state.resClass}
          onClick={this.Update}
        >
          <SyncIcon />
        </button>
      </div>
    );
  }
}
