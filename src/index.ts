#!/usr/bin/env node
/* eslint-disable import/no-extraneous-dependencies */

import Commander from 'commander'
import chalk from 'chalk'
import prompts, { Answers } from 'prompts'
import { existsSync } from 'fs'
import { basename, resolve } from 'path'

// dployr package.json file
import dployrPackageJson from '../package.json'

// Initialize the project path with an empty string
let projectPath: string = ''
// Project name
let projectName: string = ''
// Absolute path to the nodejs project
let resolvedProjectPath: string = ''

// This is the main program
const program = new Commander.Command(dployrPackageJson.name)
  // Assign npm version to the program
  .version(dployrPackageJson.version)
  .usage(
    `${chalk.green(
      'Provide the project path with -P or --path option'
    )} [The default path is ./]`
  )
  .option('-p, --path [path]', 'The project path to be dployed')
  .allowUnknownOption()

// Parses the passes options and arguments
program.parse(process.argv)

// Asks for project path
async function askProjectPath(): Promise<string> {
  const res = await prompts({
    type: 'text',
    name: 'path',
    message:
      'Path to the Node.js project?',
    initial: './',
    validate: (path) => {
      // TODO: Let's check if the path is valid
      // a valid package.json file should be presented
      // return the value based on the validation result
      return true
    },
  })

  return res.path
}

// This is the main function and runs right after execution of the program
async function run(): Promise<void> {
  const options = program.opts()
  // Check if user provided a path to the project directory
  if (options.path) {
    // User did specified a path
    if (typeof options.path === 'string') {
      projectPath = options.path
      onProjectPath()
    }
  } else {
    // User didn't specified a path
    // Lets explicitly ask for a path
    getProjectPath()
  }

  // TODO: is this condition ever going to happen?
  if (!projectPath) {
    // we steel don't have a project path
    // TODO: Ask for the project path with more detailed guidance
    // Maybe a link to a video or webpage for step by step usage guide
  } else {
    // Project path is specified and validated
    // TODO: Let's go for next steps
  }
}

function getProjectPath(retry = false) {
  // if retry specified we want to provide a verbose guide
  if (retry) {
    console.log(`${chalk.yellowBright(`
Please provide a proper path to a nodejs project root
(../projects/my-nodejs-project)
`)}`)
  }
  askProjectPath().then(
    path => {
      if (typeof path === 'string') {
        projectPath = path
        onProjectPath()
      }
    }
  )
}

function onProjectPath() {
  projectPath = projectPath.trim()
  resolvedProjectPath = resolve(projectPath)
  const pathExists = validatePathOrFile(resolvedProjectPath)
  // Provided path exists
  console.log()
  console.log(`Validating specified path... ${pathExists ? chalk.green('ok') : chalk.red('failed')}`)

  if (!pathExists) {
    // Path validation failed
    // Let's ask again with a verbose guide
    getProjectPath(true)
  } else {
    // Path validation success
    onPathValidationSuccess()
  }
  // TODO: moved this to appropriate place
  // projectName = basename(resolvedProjectPath)

}


// Path validation success
function onPathValidationSuccess() {
  // Let's verify the project structure by locating a package.json file
  // TODO: in project path fetching we should tell user to specify the root folder where package.json file exists in
  const resolvedPackageJson = resolve(resolvedProjectPath, 'package.json')
  const isPackageJson = validatePathOrFile(resolvedPackageJson)
  console.log(`Check if package.json file exists... ${isPackageJson ? chalk.green('ok') : chalk.red('failed')}`)
  if (!isPackageJson) {
    console.log()
    console.log(`Warning: ${chalk.yellow('Any nodejs project must have a package.json file')}`)
    getProjectPath(true)
  }

}

// Validate project path
function validatePathOrFile(path: string): boolean {
  try {
    if (existsSync(path)) {
      return true
    } else {
      return false
    }
  } catch (e) {
    console.log("An error occurred.")
    process.exit(1)
  }
}

// Configuring the program help
program.configureHelp({
  sortSubcommands: true,
  subcommandTerm: (cmd) => cmd.name(), // Just show the name, instead of short usage.
})

// This command is used to signup admin user
// usage: dploy-node-app signup
// TODO: ask for user email/username and password
program
  .command(
    'signup <email>',
    'This email address is used for admin authentication'
  )
  .action(() => {
    console.log('Signing you up...')
  })

run()
  .then()
  .catch(async (reason) => {
    console.log('Aborting installation')
  })
