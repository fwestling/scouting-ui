import React, { Component, Fragment } from "react";

import { GetRanking } from "../Utils";

export default class AllianceView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: this.props.scout_data.map(team => {
        team.Gone = false;
        return team;
      })
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(team_id) {
    console.log("Toggling " + team_id);
    let T = this.state.teams;
    T.map(t => {
      if (t.ec5_uuid === team_id) t.Gone = !t.Gone;
      return t;
    });
    this.setState({ teams: T }, () => console.log(this.state.teams));
  }

  render() {
    console.log("Test");
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
            <div className="allianceSelection">
              <table className="table">
                <thead>
                  <tr>
                    <th>Team number</th>
                    <th>Team name</th>
                    <th>Score</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.teams
                    .map(team => {
                      team.Rank = GetRanking(team, this.props.match_data);
                      return team;
                    })
                    .sort((a, b) => {
                      return b.Rank - a.Rank;
                    })
                    .map((team, idx) => (
                      <tr key={idx} className={team.Gone ? "cross" : "happy"}>
                        <td>{team.Team_Number}</td>
                        <td>{team.Team_Name}</td>
                        <td>{team.Rank}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={e => {
                              this.toggle(team.ec5_uuid);
                            }}
                          >
                            <i className="fas fa-times-circle" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}
