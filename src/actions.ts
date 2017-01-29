import { Syntax } from 'esprima';
import { map } from 'ramda'
import { program } from './templates'
import { Action } from './types'

function makeAction(name: String): Object {
  return {
    type: Syntax.Property,
    key: { type: Syntax.Identifier, name },
    value: {
      type: Syntax.ArrowFunctionExpression,
      id: null,
      params: [ {
        type: Syntax.Identifier,
        name: 'value'
      } ],
      body: {
        type: Syntax.ObjectExpression,
        properties: [
          { 
            type: Syntax.Property,
            key: { type: Syntax.Identifier, name: 'type' },
            value: { type: Syntax.Literal, value: name },
            kind: 'init'
          },
          {
            type: Syntax.Property,
            key: { type: Syntax.Identifier, name: 'value' },
            value: { type: Syntax.Identifier, name: 'value' },
            kind: 'init',
            shorthand: true
          }
        ]
      }
    },
    kind: 'init'
  }
}

const makeActions = (actionNames: string[]) => ({
  type: Syntax.ObjectExpression,
  properties: actionNames.map(makeAction)
})

export function writeActions(actions: Action[]) {
  return program(
    makeActions(map(({name}) => name, actions))
  )
}