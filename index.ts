#!/usr/bin/env node
/* eslint-disable import/no-extraneous-dependencies */

import chalk from 'chalk'
import Commander from 'commander'
import path from 'path'
import prompts from 'prompts'
import checkForUpdate from 'update-check'
import { dployApp, DownloadError } from './dploy-node-app'
import { validateNpmName } from './helpers/validate-pkg'
import packageJson from './package.json'