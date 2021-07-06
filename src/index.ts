#!/usr/bin/env node
/* eslint-disable import/no-extraneous-dependencies */

import Commander from 'commander'
import chalk from 'chalk'
import prompts from 'prompts'

import packageJson from '../package.json'

// initialize the project path with an empty string
let projectPath: string = ''

// This is the main program
const program = new Commander.Command(packageJson.name)
  // Assign npm version to the program
  .version(packageJson.version)
  .usage(
    `${chalk.green(
      'Provide the project path with -P or --path option'
    )} [The default path is ./]`
  )
  .option('-p, --path [path]', 'The project path to be dployed')
  .allowUnknownOption()

// Parses the passes options and arguments
program.parse(process.argv)

// This is the main function and runs right after excecution of the program
async function run(): Promise<void> {
  const options = program.opts()
  // Check if user provided a path to the project directory
  if (options.path) {
    // User did specified a path
    if (typeof options.path === 'string') {
      projectPath = options.path.trim()
      // TODO: validate the specified path
    }
  } else {
    // User didn't specified a path
    // Lets explicitly ask for a path
    const resp = await prompts({
      type: 'text',
      name: 'path',
      message:
        'Please specify the path to the Node.js project you want to dploy',
      initial: './',
      validate: (path) => {
        // TODO: Let's check if the path is valid
        // a valid package.json file should be presented
        // return the value based on the validastion result
        return true
      },
    })

    if (typeof resp.path === 'string') projectPath = resp.path.trim()
  }

  if (!projectPath) {
    // we steel don't have a project path
    // TODO: Ask for the project path with more detailed guidance
    // Maybe a link to a video or webpage for step by step usage guide
  } else {
    // Project path is specified and validated
    // TODO: Let's go for next steps
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
