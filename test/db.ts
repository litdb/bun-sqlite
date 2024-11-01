import { connect } from "../src"

export const driver = connect("app.db")
export const $ = driver.$
export const async = driver.async
export const sync = driver.sync
