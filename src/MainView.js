import React, { Component, Fragment } from "react";

import { FetchAllTeams, FetchSingleTeam, FetchTeamPhoto } from "./Utils";

import SyncIcon from "@material-ui/icons/Sync";
import { Select, MenuItem } from "@material-ui/core";

export default class MainView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      res: "",
      resClass: "",
      access_token: "",
      selected: ["", "", ""],
      pics: [null, null, null],
      scout_data: []
    };

    this.Update = this.Update.bind(this);
    this.SelectorChange = this.SelectorChange.bind(this);

    this.Update();
  }

  Update() {
    FetchAllTeams(
      res => {
        console.log(res);
        this.setState({
          scout_data: res.data.data.entries,
          res: "Success!",
          resClass: "success"
        });
      },
      err => {
        this.setState({ res: "Failed: " + err, resClass: "danger" });
      }
    );
  }

  SelectorChange(evt, idx) {
    let S = this.state.selected;
    S[idx] = evt.target.value;
    this.setState({
      selected: S
    });
    let team = this.state.scout_data.find(x => x.ec5_uuid === evt.target.value);
    if (team) {
      console.log("Team");
      console.log(team);
      FetchTeamPhoto(
        team.ec5_uuid,
        team.Picture_of_robot,
        res => {
          console.log(res);
        },
        err => {
          console.error("Error fetching team photo: " + err);
        }
      );
    }
  }
  // https://five.epicollect.net/api/internal/media/team-5876-infinite-recharge-scouting?type=photo&amp;format=entry_thumb&amp;name=bc182abc-9306-47a4-bef8-2fe973938f2a_1580095122.jpg
  // https://five.epicollect.net/api/internal/media/team-5876-infinite-recharge-scouting?type=photo&format=entry_thumb&name=bc182abc-9306-47a4-bef8-2fe973938f2a_1580095122.jpg
  // https://five.epicollect.net/api/internal/media/team-5876-infinite-recharge-scouting?type=photo&format=entry_thumb&name=bc182abc-9306-47a4-bef8-2fe973938f2a_1580095122.jpg
  // https://five.epicollect.net/api/internal/media/team-5876-infinite-recharge-scouting?type=photo&format=entry_original&name=bc182abc-9306-47a4-bef8-2fe973938f2a_1580095122.jpg

  render() {
    console.log(this.state.scout_data);
    return (
      <div className="primary-view">
        {this.state.scout_data.length === 0 ? (
          <Fragment>
            <h1>{this.state.res || "Loading..."}</h1>
          </Fragment>
        ) : (
          <Fragment>
            <div className="selectors">
              <div className="team team-A">
                <Select
                  value={this.state.selected[0]}
                  className="team-selector"
                  onChange={e => this.SelectorChange(e, 0)}
                >
                  {this.state.scout_data
                    .sort((a, b) => {
                      return a.Team_Number - b.Team_Number;
                    })
                    .map((x, i) => (
                      <MenuItem key={i} value={x.ec5_uuid}>
                        {x.Team_Number} {x.Team_Name}
                      </MenuItem>
                    ))}
                </Select>
              </div>

              <div className="team team-B">
                <Select
                  value={this.state.selected[1]}
                  className="team-selector"
                  onChange={e => this.SelectorChange(e, 1)}
                >
                  {this.state.scout_data
                    .sort((a, b) => {
                      return a.Team_Number - b.Team_Number;
                    })
                    .map((x, i) => (
                      <MenuItem key={i} value={x.ec5_uuid}>
                        {x.Team_Number} {x.Team_Name}
                      </MenuItem>
                    ))}
                </Select>
              </div>
              <div className="team team-C">
                <Select
                  value={this.state.selected[2]}
                  className="team-selector"
                  onChange={e => this.SelectorChange(e, 2)}
                >
                  {this.state.scout_data
                    .sort((a, b) => {
                      return a.Team_Number - b.Team_Number;
                    })
                    .map((x, i) => (
                      <MenuItem key={i} value={x.ec5_uuid}>
                        {x.Team_Number} {x.Team_Name}
                      </MenuItem>
                    ))}
                </Select>
              </div>
            </div>
          </Fragment>
        )}
        <a
          className={"refresh refresh-" + this.state.resClass}
          onClick={this.Update}
        >
          <SyncIcon />
        </a>
      </div>
    );
  }
}
