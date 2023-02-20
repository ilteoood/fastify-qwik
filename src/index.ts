import {createQwikCity} from '@builder.io/qwik-city/middleware/node'
import type {FastifyPluginAsync} from 'fastify'
import fastifyPlugin from 'fastify-plugin'

interface QwikPluginOptions {
    distDir: string
    buildDir: string
}

const qwikPlugin: FastifyPluginAsync<QwikPluginOptions> = async (fastify, options) => {
    const {router, notFound} = createQwikCity({render, qwikCityPlan})



}

export default fastifyPlugin(qwikPlugin)