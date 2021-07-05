# Dploy Node App

The easiest way to dploy any Node.js application is by using `dploy-node-app`. This CLI tool enables you to quickly dploy any Node.js application to any server, with everything set up for you.
To get started, use the following command:

```bash
npx dploy-node-app
```

## Options

`dploy-node-app` comes with the following options:

- **--ts, --typescript** - Initialize as a TypeScript project.
- **-e, --example [name]|[github-url]** - An example to bootstrap the app with. You can use an example name from the [Next.js repo](https://github.com/vercel/next.js/tree/master/examples) or a GitHub URL. The URL can use any branch and/or subdirectory.
- **--example-path &lt;path-to-example&gt;** - In a rare case, your GitHub URL might contain a branch name with a slash (e.g. bug/fix-1) and the path to the example (e.g. foo/bar). In this case, you must specify the path to the example separately: `--example-path foo/bar`
- **--use-npm** - Explicitly tell the CLI to bootstrap the app using npm. To bootstrap using yarn we recommend to run `yarn create next-app`

## Why use Dploy Node App?

`dploy-node-app` allows you to create a new Next.js app within seconds. It is officially maintained by the creators of Next.js, and includes a number of benefits:

- **Interactive Experience**: Running `npx create-next-app` (with no arguments) launches an interactive experience that guides you through setting up a project.
- **Zero Dependencies**: Initializing a project is as quick as one second. Create Next App has zero dependencies.
- **Offline Support**: Create Next App will automatically detect if you're offline and bootstrap your project using your local package cache.
- **Support for Examples**: Create Next App can bootstrap your application using an example from the Next.js examples collection (e.g. `npx create-next-app --example api-routes`).
- **Tested**: The package is part of the Next.js monorepo and tested using the same integration test suite as Next.js itself, ensuring it works as expected with every release.
