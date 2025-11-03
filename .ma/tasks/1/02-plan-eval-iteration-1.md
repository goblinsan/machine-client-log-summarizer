# Plan Evaluation - Iteration 1

Generated: 2025-11-03T19:56:15.727Z

**Status:** fail

## Evaluation Details

{"status":"fail","reason":"Plan references files in languages outside the repository context: cli.py (Python). Allowed languages: TypeScript, JavaScript.","guard":"language_policy","details":{"allowed_languages":["TypeScript","JavaScript"],"violations":[{"file":"cli.py","language":"Python"}]}}

## Structured Feedback

```json
{
  "status": "fail",
  "reason": "Plan references files in languages outside the repository context: cli.py (Python). Allowed languages: TypeScript, JavaScript.",
  "guard": "language_policy",
  "details": {
    "allowed_languages": [
      "TypeScript",
      "JavaScript"
    ],
    "violations": [
      {
        "file": "cli.py",
        "language": "Python"
      }
    ]
  }
}
```
