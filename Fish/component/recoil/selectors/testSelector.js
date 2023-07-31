import { atom,selector,selectorFamily } from "recoil"

export const testDefaultGps = atom({
    key : 'testDefaultGps',
    default : [
        { latitude: 37, longitude: 126, language : 'ko' },
        { latitude: 37.001, longitude: 126, language : 'eu' },
        { latitude: 37.002, longitude: 126, language : 'en'},
        { latitude: 37.003, longitude: 126, language : 'jp'},
        { latitude: 37.004, longitude: 126, language : 'ch' },
        { latitude: 37.005, longitude: 126, language : 'nk' },
        { latitude: 37.001, longitude: 126, language : 'jp' },
        { latitude: 37.002, longitude: 126, language : 'ko' },
        { latitude: 37.003, longitude: 126, language : 'ch' },
        { latitude: 37.004, longitude: 126, language : 'jp' },
        { latitude: 37.005, longitude: 126, language : 'ko' },
        { latitude: 37.001, longitude: 126, language : 'nk' },
        { latitude: 37.002, longitude: 126, language : 'eu' },
    ]
})

export const filteredArticle = selectorFamily({
    key : 'filteredArticle',
    get: ({param1, param2}) => ({get}) => get(testDefaultGps).filter((item) => item.latitude === param1 && item.longitude === param2)
})