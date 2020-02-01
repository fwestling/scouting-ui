export const config = {
  project_slug: "artemis-scouting",
  form_ref_pit_scouting: "a60f4a287fc94f9fb26dd500afa3f965_5c709f3f878d1",
  form_ref_match_scouting: "a60f4a287fc94f9fb26dd500afa3f965_5c763e134d320",
  auth: {
    grant_type: "client_credentials",
    client_id: 1444,
    client_secret: "rpk95sxJBQYVCU4vi8PTCJ1sA6C8FcQW1pPZTPRW"
  }
};

// Mapping data to score
// match_data is an array of all matches observed, returns a score object (with given format?)
export function GetScore(match_data) {
  console.log("GET SCORE MATCH DATA");
  console.log(match_data);
  let score = {
    cargo: 0,
    hatches: 0,
    climbs: 0,
    average_cargo: 0,
    average_hatches: 0
  };
  match_data.forEach(x => {
    score.cargo += x.Total_Cargo;
    score.hatches += x.Total_Hatches;
  });
  score.average_cargo = score.cargo / match_data.length;
  score.average_hatches = score.hatches / match_data.length;

  return score;
}
