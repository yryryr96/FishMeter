import { atom,selector,selectorFamily } from "recoil"

export const userId = atom({
    key: "userId",
    default: null,
});

export const myLocation = atom({
    key : 'myLocation',
    default : [37.541,126.986]
})

export const userDatas = atom({
    key : 'userDatas',
    default : []
})

export const totalDatas = atom({
    key : 'totalDatas',
    default : []
})

export const filteredDatas = selectorFamily({
    key : 'filteredDatas',
    get: (params) => ({get}) => {
        const totalItems = get(totalDatas)
        const filteredItems = totalItems.filter((it) => params.includes(it.species));
        // console.log("IIIIIIIIIIIIIIIIIIIIII",filteredItems)
        return filteredItems
    }
})

export const Dates = selector({
    key : 'Dates',
    get : ({get}) => {
        const dates = new Set();
        get(userDatas).forEach((item) => dates.add(item.createdAt.substring(0,10)))
        return dates;
    }
})

export const sameDateItems = selectorFamily({
    key : 'sameDateItems',
    get : (params) => ({get}) => {
        const totalItems = get(userDatas)
        const Items = totalItems.filter((item) => params === item.createdAt.substring(0,10))
        return Items;
    }
});