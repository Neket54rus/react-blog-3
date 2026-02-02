/* eslint-disable @typescript-eslint/no-namespace */

import * as commonCommands from './commands/common'
import * as porfileCommands from './commands/profile'
import * as articleCommands from './commands/article'
import * as commentsCommands from './commands/comments'
import * as ratingCommands from './commands/rating'

Cypress.Commands.addAll(commonCommands)
Cypress.Commands.addAll(porfileCommands)
Cypress.Commands.addAll(articleCommands)
Cypress.Commands.addAll(commentsCommands)
Cypress.Commands.addAll(ratingCommands)

export {}
