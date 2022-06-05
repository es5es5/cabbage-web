const ENV = process.env.NODE_ENV
// const ENV = 'production'
// console.log(process.env.NODE_ENV)

// cuome
const CUOME = {
  development: process.env.VUE_APP_NEST_API,
  production: process.env.VUE_APP_NEST_API
}

export const NODE_ENV = ENV
export const ENV_CUOME = CUOME[ENV]
