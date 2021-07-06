#!/usr/bin/env node
/* eslint-disable import/no-extraneous-dependencies */

import Commander from 'commander'
import chalk from 'chalk'

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

// Parses the passes options and arguments
program.parse(process.argv)

// This is the main function and runs right after excecution of the program
async function run(): Promise<void> {
  const options = program.opts()
  console.log(
    options.path ? `Specified path is ${options.path}` : 'No path specified'
  )
}

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
