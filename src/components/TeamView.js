import React, { Component } from "react";
import PhotoIcon from "@material-ui/icons/Photo";
import { GetScoreForTeam } from "../Utils";

export default class TeamView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showpic: false,
      error: false
    };

    this.ToggleShowPic = this.ToggleShowPic.bind(this);
  }

  ToggleShowPic() {
    console.log(this.state.showpic);
    this.setState({ showpic: !this.state.showpic });
  }

  render() {
    let score = GetScoreForTeam(this.props.matches);

    console.log("Team Data:");
    console.log(this.props.team);
    return (
      <div hidden={!this.props.team}>
        {score && (
          <table className="table">
            <tbody>
              {Object.keys(score).map(key => (
                <tr key={key}>
                  <td>{key.replace("_", " ")}</td>
                  <td>{score[key]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {this.state.showpic ? (
          this.props.loading ? (
            <span>Loading...</span>
          ) : this.props.pic ? (
            <img
              alt="No pic found"
              src={"data:image/jpeg;base64," + this.props.pic}
              onClick={this.ToggleShowPic}
            />
          ) : (
            <span
              className={this.state.error ? "text-error" : ""}
              onClick={this.ToggleShowPic}
            >
              No photo found...
            </span>
          )
        ) : (
          <button onClick={this.ToggleShowPic}>
            <PhotoIcon />
          </button>
        )}
      </div>
    );
  }
}
