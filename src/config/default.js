import * as imports from "./destination-deep-space";

export const config = imports.config;

// Mapping data to score
// match_data is an array of all matches observed, returns a score object (with given format?)

export function GetScore(match_data) {
  return imports.GetScore(match_data);
}

// Return a rating for how well a whole alliance would perform
// At the moment, just summing all three robots... should be done smarter
// Note: any of the teams may be null, cover that case.
export function RateAlliance(match_data, teamA, teamB, teamC) {
  return imports.RateAlliance(match_data, teamA, teamB, teamC);
}

export function RankTeam(data) {
  return imports.RankTeam;
}
