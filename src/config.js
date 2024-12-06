import {config} from 'dotenv'

config()

console.log(process.env.PORT)
console.log(process.env.BD_HOST)
console.log(process.env.BD_USER)
console.log(process.env.BD_PASSWORD)
console.log(process.env.BD_DATABASE)

