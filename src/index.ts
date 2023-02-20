import {createQwikCity} from '@builder.io/qwik-city/middleware/node'
import {ServerRenderOptions} from '@builder.io/qwik-city/middleware/request-handler'
import fastifyStatic from '@fastify/static'
import qwikCityPlan from '@qwik-city-plan'
import type {FastifyPluginAsync} from 'fastify'
import fastifyPlugin from 'fastify-plugin'

interface QwikPluginOptions {
    distDir: string
    buildDir: string
    render: ServerRenderOptions['render']
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

const qwikPlugin: FastifyPluginAsync<QwikPluginOptions> = async (fastify, options) => {
    const {render, buildDir, distDir} = options

    const {router, notFound} = createQwikCity({render, qwikCityPlan})

    fastify.register(fastifyStatic, {
        root: buildDir,
        prefix: '/build',
        immutable: true,
        maxAge: '1y',
        decorateReply: false
    })

    fastify.register(fastifyStatic, {
        root: distDir,
        redirect: false,
        decorateReply: false
    })

    fastify.setNotFoundHandler(async (request, response) => {
        await router(request.raw, response.raw, noop)
        await notFound(request.raw, response.raw, noop)
    })
}

export default fastifyPlugin(qwikPlugin)