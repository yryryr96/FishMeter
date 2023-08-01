import { atom,selector,selectorFamily } from "recoil"

export const testDefaultGps = atom({
    key : 'testDefaultGps',
    default : [
        { latitude: 35.0968275, longitude: 128.8538282, language : 'ko' },
        { latitude: 35.0968275+0.001, longitude: 128.8538282, language : 'eu' },
        { latitude: 35.0968275+0.002, longitude: 128.8538282, language : 'en'},
        { latitude: 35.0968275+0.003, longitude: 128.8538282, language : 'jp'},
        { latitude: 35.0968275+0.004, longitude: 128.8538282, language : 'ch' },
        { latitude: 35.0968275+0.005, longitude: 128.8538282, language : 'nk' },
        { latitude: 35.0968275+0.006, longitude: 128.8538282, language : 'nk' },
        { latitude: 35.0968275+0.007, longitude: 128.8538282, language : 'nk' },
        { latitude: 35.0968275+0.008, longitude: 128.8538282, language : 'nk' },
        { latitude: 35.0968275+0.009, longitude: 128.8538282, language : 'nk' },
    ]
})

export const filteredArticle = selectorFamily({
    key : 'filteredArticle',
    get: ({param1, param2}) => ({get}) => get(testDefaultGps).filter((item) => item.latitude === param1 && item.longitude === param2)
})