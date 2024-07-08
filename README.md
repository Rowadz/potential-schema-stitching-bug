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
