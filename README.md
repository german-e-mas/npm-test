# npm-test
A package just for testing purposes

## Steps

1- Generate the code using `ts-proto`. The output is on `src/ts`.
2- As the output consists on several files, we need to add them to an `index.ts` entrypoint. Doing so manually is a pain, so a bash script generates it for us. See [this issue](https://github.com/stephenh/ts-proto/issues/522) and the las paragraph of [the official README](https://github.com/stephenh/ts-proto#quickstart).
3- Once the `index.ts` is generated, we need to compile the typescript files using `tsc`. For doing that, we need a `tsconfig.json` file and `typescript` as a dev dependency. The `index.ts` generation step and compilation is on an npm script. The output is on `/dist`.
4- Bump the version in `package.json`. This is required for external clients to install the new version.
5- Publish!
