# ATLAS_TEST_REPORT

Generated: 2026-07-30T23:27:05Z
WO: WO-ATLAS-008
Overall: PASS

| Test | Result | Chain |
|---|---|---|
| Founder Journey | PASS | `'founder_login → anny → mission'` |
| Citizen Journey | PASS | `'citizen → support → child_citizen'` |
| Evidence Flow | PASS | `'workers → evidence'` |
| Validation Flow | PASS | `'evidence → harlemm'` |
| Runtime Flow | PASS | `'runtime → commit_mutation → institutional_state'` |
| Support Flow | PASS | `'citizen → support'` |

```json
{
  "schema": "conrrad.atlas.institutional_tests/v1",
  "wo": "WO-ATLAS-008",
  "generated_at": "2026-07-30T23:27:05Z",
  "all_pass": true,
  "results": [
    {
      "name": "Founder Journey",
      "chain": [
        "founder_login",
        "anny",
        "mission"
      ],
      "result": "PASS",
      "pass": true
    },
    {
      "name": "Citizen Journey",
      "chain": [
        "citizen",
        "support",
        "child_citizen"
      ],
      "result": "PASS",
      "pass": true
    },
    {
      "name": "Evidence Flow",
      "chain": [
        "workers",
        "evidence"
      ],
      "result": "PASS",
      "pass": true
    },
    {
      "name": "Validation Flow",
      "chain": [
        "evidence",
        "harlemm"
      ],
      "result": "PASS",
      "pass": true
    },
    {
      "name": "Runtime Flow",
      "chain": [
        "runtime",
        "commit_mutation",
        "institutional_state"
      ],
      "result": "PASS",
      "pass": true
    },
    {
      "name": "Support Flow",
      "chain": [
        "citizen",
        "support"
      ],
      "result": "PASS",
      "pass": true
    }
  ],
  "nodes": 27,
  "relations": 65
}
```

STOP
