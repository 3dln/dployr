#!/usr/bin/env node
/* eslint-disable import/no-extraneous-dependencies */

import Commander from 'commander'
import chalk from 'chalk'
import prompts from 'prompts'
import checkForUpdate from 'update-check'

import packageJson from '../package.json'
import { IAdmin } from './interfaces/admin';

// initialize the project path with an empty string
let projectPath: string = ''
// the admin user
let adminUser: IAdmin

// This is the main program
const program = new Commander.Command(packageJson.name)
    // Assign npm version to the program
    .version(packageJson.version)

// This command is used to signup admin user
// usage: dploy-node-app signup
// TODO: ask for user email/username and password
program.command('signup')
    .action(() => {
        console.log("Signing you up...")
    })


program.parse(process.argv)