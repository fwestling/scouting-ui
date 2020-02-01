import React, { Component, Fragment } from "react";

import { FetchAllTeams, FetchMatchData, FetchTeamPhoto } from "./Utils";

import SyncIcon from "@material-ui/icons/Sync";
import { Select, MenuItem } from "@material-ui/core";

import TeamView from "./TeamView";

export default class MainView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      res: "",
      resClass: "",
      access_token: "",
      teamA: null,
      teamB: null,
      teamC: null,
      pics: [null, null, null],
      loading: [false, false, false],
      match_data: [],
      scout_data: []
    };

    this.Update = this.Update.bind(this);
    this.GetPhoto = this.GetPhoto.bind(this);
    this.SelectorChange = this.SelectorChange.bind(this);
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

  SelectorChange(evt, idx) {
    console.log("TARGET VALUE: " + evt.target.value);
    console.log(this.state.scout_data);
    console.log(
      this.state.scout_data.find(x => x.ec5_uuid === evt.target.value)
    );
    let L = this.state.loading;
    L[idx] = true;
    let P = this.state.pics;
    P[idx] = "";
    if (idx === 0) {
      this.setState(
        {
          teamA: this.state.scout_data.find(
            x => x.ec5_uuid === evt.target.value
          ),
          loading: L,
          pics: P
        },
        () => {
          this.GetPhoto(this.state.teamA, idx);
        }
      );
    } else if (idx === 1) {
      this.setState(
        {
          teamB: this.state.scout_data.find(
            x => x.ec5_uuid === evt.target.value
          ),
          loading: L,
          pics: P
        },
        () => {
          this.GetPhoto(this.state.teamB, idx);
        }
      );
    } else if (idx === 2) {
      this.setState(
        {
          teamC: this.state.scout_data.find(
            x => x.ec5_uuid === evt.target.value
          ),
          loading: L,
          pics: P
        },
        () => {
          this.GetPhoto(this.state.teamC, idx);
        }
      );
    }
  }

  GetPhoto(team, idx) {
    FetchTeamPhoto(
      team.ec5_uuid,
      team.Picture_of_robot,
      res => {
        let P = this.state.pics;
        P[idx] = res;
        let L = this.state.loading;
        L[idx] = false;
        console.log(P[idx]);
        this.setState(
          {
            pics: P,
            loading: L
          },
          () => {
            console.log("STATE UPDATED");
            console.log(this.state);
          }
        );
      },
      err => {
        console.log(err);
        console.error("Error fetching team photo: " + err);
        let P = this.state.pics;
        P[idx] = "";
        let L = this.state.loading;
        L[idx] = false;
        this.setState({
          pics: P,
          loading: L
        });
      }
    );
  }

  // https://five.epicollect.net/api/internal/media/team-5876-infinite-recharge-scouting?type=photo&amp;format=entry_thumb&amp;name=bc182abc-9306-47a4-bef8-2fe973938f2a_1580095122.jpg
  // https://five.epicollect.net/api/internal/media/team-5876-infinite-recharge-scouting?type=photo&format=entry_thumb&name=bc182abc-9306-47a4-bef8-2fe973938f2a_1580095122.jpg
  // https://five.epicollect.net/api/internal/media/team-5876-infinite-recharge-scouting?type=photo&format=entry_thumb&name=bc182abc-9306-47a4-bef8-2fe973938f2a_1580095122.jpg
  // https://five.epicollect.net/api/internal/media/team-5876-infinite-recharge-scouting?type=photo&format=entry_original&name=bc182abc-9306-47a4-bef8-2fe973938f2a_1580095122.jpg

  render() {
    console.log(this.state.scout_data);
    return (
      <div className="primary-view">
        {this.state.match_data.length === 0 ? (
          <Fragment>
            <h1>{this.state.res || "Loading..."}</h1>
          </Fragment>
        ) : (
          <Fragment>
            <div className="selectors">
              {[this.state.teamA, this.state.teamB, this.state.teamC].map(
                (team, idx) => (
                  <div className="team" key={idx}>
                    <Select
                      value={team ? team.ec5_uuid : ""}
                      className="team-selector"
                      onChange={e => this.SelectorChange(e, idx)}
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
                    {team && (
                      <TeamView
                        team={team}
                        matches={this.state.match_data.filter(
                          x => x.ec5_parent_uuid === team.ec5_uuid
                        )}
                        pic={this.state.pics[idx]}
                        loading={this.state.loading[idx]}
                      />
                    )}
                  </div>
                )
              )}
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
