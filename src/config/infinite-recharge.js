export const config = {
  project_slug: "team-5876-infinite-recharge-scouting",
  form_ref_pit_scouting: "30a3763d612844c285b9e93d4bf72b64_5e2e47027b041",
  form_ref_match_scouting: "30a3763d612844c285b9e93d4bf72b64_5e2e4ee002375",
  auth: {
    grant_type: "client_credentials",
    client_id: 1428,
    client_secret: "iruBoItL9XjiEeQp3v9OPPXIRzqc2uSl0z0cJQOM"
  }
};

// Mapping data to score
// match_data is an array of all matches observed, returns a score object (with given format?)
export function GetScore(match_data) {
  return {
    power_cells: 0,
    climbs: 0
  };
}
