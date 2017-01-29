import { Syntax } from 'esprima'
import { append, map } from 'ramda'
import { id, program } from './templates'
import { Action } from './types'

function makeReducer(actionName: String) {
  return {
    type: Syntax.SwitchCase,
    test: {
      type: Syntax.Literal,
      value: actionName
    },
    consequent: [
      {
        type: Syntax.ReturnStatement,
        argument: {
          type: Syntax.Identifier,
          name: 'state'
        }
      }
    ]
  }
}

const reducer = (actions: Action[]) => ({
  type: Syntax.FunctionExpression,
    id: null,
    params: [
      { type: Syntax.Identifier, name: 'state' },
      { type: Syntax.Identifier, name: 'action' }
    ],
    body: {
      type: Syntax.BlockStatement,
      body: [
        {
          type: Syntax.SwitchStatement,
          discriminant: {
            type: Syntax.MemberExpression,
            object: {
              type: Syntax.Identifier,
              name: 'action'
            },
            property: {
              type: Syntax.Identifier,
              name: 'type'
            }
          }
          ,
        cases: append(
            {
              type: Syntax.SwitchCase,
              test: null,
              consequent: [{
                type: Syntax.ReturnStatement,
                argument: id('state')
              }]
            },
            map(({name}) => makeReducer(name), actions)
        )
        }
      ]
    }
})

export default function(actions: Action[]) {
  return program(
    reducer(actions)
  );
}