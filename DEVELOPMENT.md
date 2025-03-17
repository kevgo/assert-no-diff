# Development Guide

- run all tests: <code type="npm/script-call">npm run test</code>

### deploy a new version

- update `package.json` to the new version
- run `npm install` to update `package-lock.json`
- commit to `main`
- run `npm publish`
