import { Syntax } from 'esprima';
import { filter, map } from 'ramda'
import { block, id, literal, program } from './templates'
import { Action } from './types'

const taker = (action: Action) => ({
  type: Syntax.YieldExpression,
  argument: {
    type: Syntax.CallExpression,
    callee: id('takeEvery'),
    arguments: [
      id(action.name),
      literal(`_${action.name}`)
    ]
  }
})

const makeSaga = (actions: Action[]) =>
  ({
    type: Syntax.FunctionExpression,
    generator: true,
    id: null,
    params: [],
    body: block(
      map(
        taker,
        actions
      )
    )
  })

export default function(actions: Action[]) {
  return program(
    makeSaga(
      filter(
        ({effectful}) => effectful,
        actions
      )
    )
  )
}