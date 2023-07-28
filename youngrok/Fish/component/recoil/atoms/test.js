import { atom } from "recoil"

export const testNumber = atom({
    key : 'test',
    default : 0,
})

export const testGpsList = atom({
    key : 'testGpsList',
    default : []
})