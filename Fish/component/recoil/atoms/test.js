import { atom, selector } from 'recoil';
import * as Location from 'expo-location';

export const testNumber = atom({
    key : 'test',
    default : 0,
})

export const testGpsList = atom({
    key : 'testGpsList',
    default : []
})

