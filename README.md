```bash
$ git clone git@github.com:Rowadz/potential-schema-stitching-bug.git
$ cd potential-schema-stitching-bug
$ npm i
# I'm using node 18
$ npm run dev
```

When running the following query I would suspect that the `info.path.key` property in each resolver to be `userAlias01` and `userAlias02` but it's not, it's only `user`

```gql
query users {
  userAlias01: user(id: 1) {
    id
    name
  }
  userAlias02: user(id: 2) {
    id
    name
  }
}
```

`launch.json` file if you use vscode

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Run server",
      "program": "${workspaceFolder}/node_modules/nodemon/bin/nodemon",
      "args": ["src/index.ts"],
      "env": {
        "TRANSPILE_ONLY": "1"
      },
      "internalConsoleOptions": "openOnSessionStart",
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```
