import React from "react";
import PropTypes from "prop-types";

function Switch(props) {
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

Switch.propTypes = {};

export default Switch;
