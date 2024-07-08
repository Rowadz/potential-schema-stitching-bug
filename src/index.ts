import clc from 'cli-color'
import { createServer } from 'node:http'
import { YogaServerOptions, createYoga } from 'graphql-yoga'
import { schema } from './schema'
import { GraphQLContext } from './types'
import { userLoader, postLoader } from './loaders'
import { stitchSchemas } from '@graphql-tools/stitch'

export const gatewaySchema = stitchSchemas({
  subschemas: [schema],
})

const yoga = createYoga<GraphQLContext>({
  schema: gatewaySchema,
  context: {
    loaders: {
      userLoader,
      postLoader,
    },
  },
})

const server = createServer(yoga)

server.listen(4000, () => {
  console.info(
    clc.blueBright('Server is running 🚀 on http://localhost:4000/graphql')
  )
})
