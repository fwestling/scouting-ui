import React, { Component, Fragment } from "react";

import { FetchTeamPhoto, GetScoreForAlliance } from "../Utils";

import TeamView from "./TeamView";

export default class MainView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teamA: null,
      teamB: null,
      teamC: null,
      pics: [null, null, null],
      loading: [false, false, false],
    };

    this.GetPhoto = this.GetPhoto.bind(this);
    this.SelectorChange = this.SelectorChange.bind(this);
  }

  SelectorChange(evt, idx) {
    console.log("TARGET VALUE: " + evt.target.value);
    console.log(this.props.scout_data);
    console.log(
      this.props.scout_data.find((x) => x.ec5_uuid === evt.target.value)
    );
    let L = this.state.loading;
    L[idx] = true;
    let P = this.state.pics;
    P[idx] = "";
    if (idx === 0) {
      this.setState(
        {
          teamA: this.props.scout_data.find(
            (x) => x.ec5_uuid === evt.target.value
          ),
          loading: L,
          pics: P,
        },
        () => {
          this.GetPhoto(this.state.teamA, idx);
        }
      );
    } else if (idx === 1) {
      this.setState(
        {
          teamB: this.props.scout_data.find(
            (x) => x.ec5_uuid === evt.target.value
          ),
          loading: L,
          pics: P,
        },
        () => {
          this.GetPhoto(this.state.teamB, idx);
        }
      );
    } else if (idx === 2) {
      this.setState(
        {
          teamC: this.props.scout_data.find(
            (x) => x.ec5_uuid === evt.target.value
          ),
          loading: L,
          pics: P,
        },
        () => {
          this.GetPhoto(this.state.teamC, idx);
        }
      );
    }
  }

  GetPhoto(team, idx) {
    console.log("Getting photo");
    console.log({ team });
    if (team) {
      FetchTeamPhoto(
        team.ec5_uuid,
        team.Picture_of_robot,
        (res) => {
          let P = this.state.pics;
          P[idx] = res;
          let L = this.state.loading;
          L[idx] = false;
          console.log(P[idx]);
          this.setState(
            {
              pics: P,
              loading: L,
            },
            () => {
              console.log("STATE UPDATED");
              console.log(this.state);
            }
          );
        },
        (err) => {
          console.log(err);
          console.error("Error fetching team photo: " + err);
          let P = this.state.pics;
          P[idx] = "";
          let L = this.state.loading;
          L[idx] = false;
          this.setState({
            pics: P,
            loading: L,
          });
        }
      );
    }
  }

  // https://five.epicollect.net/api/internal/media/team-5876-infinite-recharge-scouting?type=photo&amp;format=entry_thumb&amp;name=bc182abc-9306-47a4-bef8-2fe973938f2a_1580095122.jpg
  // https://five.epicollect.net/api/internal/media/team-5876-infinite-recharge-scouting?type=photo&format=entry_thumb&name=bc182abc-9306-47a4-bef8-2fe973938f2a_1580095122.jpg
  // https://five.epicollect.net/api/internal/media/team-5876-infinite-recharge-scouting?type=photo&format=entry_thumb&name=bc182abc-9306-47a4-bef8-2fe973938f2a_1580095122.jpg
  // https://five.epicollect.net/api/internal/media/team-5876-infinite-recharge-scouting?type=photo&format=entry_original&name=bc182abc-9306-47a4-bef8-2fe973938f2a_1580095122.jpg

  render() {
    console.log(this.props.scout_data);
    let score = GetScoreForAlliance(
      this.props.match_data,
      this.state.teamA,
      this.state.teamB,
      this.state.teamC
    );

    return (
      <div className="primary-view">
        {this.props.match_data.length === 0 ? (
          <div className="selectors">
            <Fragment>
              <h1>Something went wrong...</h1>
            </Fragment>
          </div>
        ) : (
          <Fragment>
            <div className="selectors">
              <div className="team">
                <h1 className="team-selector">Alliance</h1>
                {score && (
                  <table className="table">
                    <tbody>
                      {Object.keys(score).map((key) => (
                        <tr key={key}>
                          <td>{key.replace("_", " ")}</td>
                          <td>{Math.round(score[key] * 100) / 100}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              {[this.state.teamA, this.state.teamB, this.state.teamC].map(
                (team, idx) => (
                  <div className="team" key={idx}>
                    <select
                      value={team ? team.ec5_uuid : ""}
                      className="team-selector"
                      onChange={(e) => this.SelectorChange(e, idx)}
                    >
                      <option value={""}></option>
                      {this.props.scout_data
                        .sort((a, b) => {
                          return a.Team_Number - b.Team_Number;
                        })
                        .map((x, i) => (
                          <option key={i} value={x.ec5_uuid}>
                            {x.Team_Number} {x.Team_Name}
                          </option>
                        ))}
                    </select>
                    {team && (
                      <TeamView
                        team={team}
                        matches={this.props.match_data.filter(
                          (x) => x.ec5_parent_uuid === team.ec5_uuid
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
      </div>
    );
  }
}
