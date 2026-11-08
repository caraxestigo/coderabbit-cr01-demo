// CR-01 follow-up payload (DRAFT — for the researcher's own repo only).
// Static-marker variant: NO fetch, NO env access. The rule only reports
// a fixed string as a lint error. Purpose: decide whether markdownlint
// executes custom rules at all in CodeRabbit's review sandbox.
// - If a finding "CR01-STATIC-MARKER" appears on test2.md, custom rules
//   DO execute, and the first payload failed on the fetch/env part only.
// - If NO finding appears, custom-rule execution is skipped/blocked
//   entirely and CR-01 is CLOSED as fail-closed.
const staticMarkerRule = {
  names: ["cr01-static-marker"],
  description: "Test rule: reports a static marker",
  tags: ["test"],
  function: function (params, onError) {
    onError({
      lineNumber: 1,
      detail: "CR01-STATIC-MARKER",
      context: "cr01-static-marker"
    });
  }
};

module.exports = {
  customRules: [staticMarkerRule]
};
