# Dploy Node App

The easiest way to dploy any Node.js application is by using `dploy-node-app`. This CLI tool enables you to quickly dploy any Node.js application to any server, with everything set up for you.

## Motivations

## Design goals

## Usage

To get started, use the following command inside any node.js root folder:

```bash
npx dploy-node-app
```

### Run in development

In one terminal run dev script and in another one run start script to test

```bash
npm run dev
```

```bash
npm start
```

### TODO

- [ ] Analyze the project
  - [ ] support for multiple languages (in cli?)
  - [ ] Check is package.json file exists
  - [ ] Check if any of these files exists git/.gitignore/.docker/.dockerignore/tsconfig.json/next.config.js/vercel.json
  - [ ] Handle environment variables (read and apply into system)
  - [ ] update .gitignore because we use this file to transfer files to the server
- [ ] CLI tool to authenticate admin (we authenticate user using next-auth)
  - [ ] Where do we need to use argument parsing
- [ ] Save admin data into sqlite db using typeorm
- [ ] Gather website data and save into db
  - [ ] Website name
  - [ ] Website type
    - [ ] node-express
    - [ ] static
    - [ ] react
    - [ ] vue
    - [ ] angular
    - [ ] lambda
    - [ ] static-build
  - [ ] Entry point file (try to fetch from package.json and it depends on the website type)
  - [ ] Add necessary changes into package.json like scripts etc.
- [ ] Select deployment type (pm2/docker-compose/kubernetes)
- [ ] Show system resources needed for each choice
- [ ] Add GUI
  - [ ] Multi language by default
- [ ] Domain registration or if existing domain change ns to required values
  - [ ] Use DIG to check ns
  - [ ] Get SSL certificated or enable SSL using Cloud Services
  - [ ] Upload test site into a subdomain and after approvement we will transfer the site to original domain
- [ ] Get server data (ubuntu default)
- [ ] Support additional distros
- [ ] Support Cloud services (Arvan/now/AWS/Google/Azure,...)
- [ ] Deploy the project
  - [ ] Offline
  - [ ] Github repo
  - [ ] Gitlab repo
  - [ ] ...
- [ ] VSCODE Extension
- [ ] Add modyfire core to any nodejs project
