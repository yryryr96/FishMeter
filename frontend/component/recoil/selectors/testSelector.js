import { atom,selector,selectorFamily } from "recoil"

export const userId = atom({
    key: "userId",
    default: null,
});

export const myLocation = atom({
    key : 'myLocation',
    default : [37.541,126.986]
})