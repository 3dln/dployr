import { Command } from 'commander'
import chalk from 'chalk'
import prompts from 'prompts'
import checkForUpdate from 'update-check'

import packageJson from '../package.json'

// initialize the project path with an empty string
let projectPath: string = ''

// This is the program built with commander library
const program = new Command(packageJson.name)
    // Assign npm version to the program
    .version(packageJson.version)
    .arguments('<project-directory>')
    .usage(`${chalk.green('<project-directory>')} [options]`)
    .action(name => { projectPath = name })
    .option('--use-npm', 'Explicitly tell CLI to bootstrap the project using npm')
    .allowUnknownOption()
    .parse(process.argv)


console.log(`the project path is ${projectPath}`)

async function run(): Promise<void> {
    if (typeof projectPath === 'string') {
        projectPath = projectPath.trim()
    }

    if (!projectPath) {
        const res = await prompts({
            type: 'text',
            name: 'path',
            message: 'What is your website named?',
            initial: 'my-website',
            validate: name => {
                return true
            },


        })

        if (typeof res.path === 'string') {
            projectPath = res.path.trim()
        }
    }
}

// Check what does update-check library do
const update = checkForUpdate(packageJson).catch(() => null)

async function notifyUpdate(): Promise<void> {
    try {
        const res = await update
        if (res?.latest) {

            console.log()
            console.log(chalk.yellow.bold('A new version of `dploy-node-app` is available!'))
            console.log('you can update by running: ' +
                chalk.cyan('npm i -g dploy-node-app')
            )
            console.log()
        }

        process.exit()

    } catch (error) {
        // we ignore the error for now
    }
}

run()
    .then(notifyUpdate)
    .catch(async (reason) => {
        console.log()
        console.log('Aborting installation')
        if (reason.Command) {
            console.log(` ${chalk.cyan(reason.Command)} has failed.`)
        } else {
            console.log(chalk.red('Unexpected error. please report it as a bug.'))
            console.log(reason)
        }

        console.log()

        await notifyUpdate()

        process.exit()
    })