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

// Should maybe include booleans "attempted defense", "attempted shooting", "attempted climb", so you don't consider non-attempts in the average
// "number of times scoring was blocked" to score defense?

function NullScore() {
  return {
    cargo: 0,
    hatches: 0,
    climbs: 0,
    average_cargo: 0,
    average_hatches: 0
  };
}

export function GetScore(match_data) {
  console.log("GET SCORE MATCH DATA");
  console.log(match_data);
  let score = NullScore();
  match_data.forEach(x => {
    score.cargo += x.Total_Cargo;
    score.hatches += x.Total_Hatches;
  });
  score.average_cargo = score.cargo / match_data.length;
  score.average_hatches = score.hatches / match_data.length;

  return score;
}

// Return a rating for how well a whole alliance would perform
// At the moment, just summing all three robots... should be done smarter
// Note: any of the teams may be null, cover that case.
export function RateAlliance(match_data, teamA, teamB, teamC) {
  console.log("RATE ALLIANCE MATCH DATA");
  console.log(match_data);

  let score = {
    cargo: 0,
    hatches: 0,
    climbs: 0
  };

  let scoreA = NullScore();
  let scoreB = NullScore();
  let scoreC = NullScore();

  if (teamA) {
    scoreA = GetScore(
      match_data.filter(x => x.ec5_parent_uuid === teamA.ec5_uuid)
    );
  }
  if (teamB) {
    scoreB = GetScore(
      match_data.filter(x => x.ec5_parent_uuid === teamB.ec5_uuid)
    );
  }
  if (teamC) {
    scoreC = GetScore(
      match_data.filter(x => x.ec5_parent_uuid === teamC.ec5_uuid)
    );
  }

  score.cargo =
    scoreA.average_cargo + scoreB.average_cargo + scoreC.average_cargo;
  score.hatches =
    scoreA.average_hatches + scoreB.average_hatches + scoreC.average_hatches;
  score.climbs = scoreA.climbs + scoreB.climbs + scoreC.climbs;

  return score;
}

export function RankTeam(data) {
  let score = GetScore(data);
  return score.cargo; // + score.hatches;
}
