import {atom} from "recoil";

export const selectedAccessoryColorAtom = atom({
    key: 'selectedAccessoryColorAtom',
    default: 'black',
});

export const selectedPanelColorAtom = atom({
    key: 'selectedPanelColorAtom',
    default: {"name": "black", "imageUrl": "/content/img/panel--bk.jpg"},
});

export const accessoriesAtom = atom({
    key: 'accessoriesAtom',
    default: []
});

export const addonsAtom = atom({
    key: 'addonsAtom',
    default: []
})