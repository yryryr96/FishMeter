import { atom,selector,selectorFamily } from "recoil"

export const testDefaultGps = atom({
    key : 'testDefaultGps',
    default : [
        { latitude: 35.0925174, longitude: 128.9104394, language : 'ko' },
        { latitude: 35.0925174+0.001, longitude: 128.9104394, language : 'eu' },
        { latitude: 35.0925174+0.002, longitude: 128.9104394, language : 'en'},
        { latitude: 35.0925174+0.003, longitude: 128.9104394, language : 'jp'},
        { latitude: 35.0925174+0.004, longitude: 128.9104394, language : 'ch' },
        { latitude: 35.0925174+0.005, longitude: 128.9104394, language : 'nk' },
        { latitude: 35.0925174+0.001, longitude: 128.9104394, language : 'jp' },
        { latitude: 35.0925174+0.002, longitude: 128.9104394, language : 'ko' },
        { latitude: 35.0925174+0.003, longitude: 128.9104394, language : 'ch' },
        { latitude: 35.0925174+0.004, longitude: 128.9104394, language : 'jp' },
        { latitude: 35.0925174+0.005, longitude: 128.9104394, language : 'ko' },
        { latitude: 35.0925174+0.001, longitude: 128.9104394, language : 'nk' },
        { latitude: 35.0925174+0.002, longitude: 128.9104394, language : 'eu' },
    ]
})

export const filteredArticle = selectorFamily({
    key : 'filteredArticle',
    get: ({param1, param2}) => ({get}) => get(testDefaultGps).filter((item) => item.latitude === param1 && item.longitude === param2)
})