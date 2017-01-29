import { generate } from 'escodegen'
import { Syntax } from 'esprima'

export const id = (name: String) => ({
  type: Syntax.Identifier,
  name
})

export const literal = (value: String) => ({
  type: Syntax.Literal,
  value
})

export const block = (body: Object) => ({
  type: Syntax.BlockStatement,
  body
})

export const program = (defaultExport: Object) =>
  generate(
    {
      type: Syntax.Program,
      body: [
        {
          type: Syntax.ExportDefaultDeclaration,
          declaration: defaultExport
        }
      ],
      sourceType: 'script',
      leadingComments: [{
        type: 'Line',
        value: ' @flow',
      }]
    },
    {
      comment: true,
      format: {
        indent: {
          style: '  '
        }
      }
    }

  )