export const config = {
  project_slug: "team-5876-rapid-react-scouting",
  form_ref_pit_scouting: "2f1cfc294733433fb68107ddefd59730_5e2e47027b041",
  form_ref_match_scouting: "2f1cfc294733433fb68107ddefd59730_5e2e4ee002375",
  auth: {
    grant_type: "client_credentials",
    client_id: 1428,
    client_secret: "iruBoItL9XjiEeQp3v9OPPXIRzqc2uSl0z0cJQOM",
  },
};

// Mapping data to score
// match_data is an array of all matches observed, returns a score object (with given format?)

// Should maybe include booleans "attempted defense", "attempted shooting", "attempted climb", so you don't consider non-attempts in the average
// "number of times scoring was blocked" to score defense?

function NullScore() {
  return {
    cargo: 0,
    climbs: 0,
    average_cargo: 0,
    highest_climb: 0,
  };
}

const climbHeight = (h) => {
  switch (h) {
    case "no":
      return 0;
    case "low":
      return 1;
    case "mid":
      return 2;
    case "high":
      return 3;
    case "traversal":
      return 4;
    default:
      return 0;
  }
};

export function GetScore(match_data) {
  console.log("GET SCORE MATCH DATA");
  console.log(match_data);
  let score = NullScore();
  match_data.forEach((x) => {
    score.cargo += x.auto_low + x.auto_high + x.teleop_low + x.teleop_high;
    score.climbs += x.hangar !== "no" ? 1 : 0;
    score.highest_climb = Math.max(score.highest_climb, climbHeight(x.hangar));
  });
  score.average_cargo = score.cargo / match_data.length;

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
    climbs: 0,
  };

  let scoreA = NullScore();
  let scoreB = NullScore();
  let scoreC = NullScore();

  if (teamA) {
    scoreA = GetScore(
      match_data.filter((x) => x.ec5_parent_uuid === teamA.ec5_uuid)
    );
  }
  if (teamB) {
    scoreB = GetScore(
      match_data.filter((x) => x.ec5_parent_uuid === teamB.ec5_uuid)
    );
  }
  if (teamC) {
    scoreC = GetScore(
      match_data.filter((x) => x.ec5_parent_uuid === teamC.ec5_uuid)
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
