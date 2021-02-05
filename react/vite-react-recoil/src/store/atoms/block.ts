import { atom } from 'recoil'

const state = atom({
    key: 'block',
    default: [{
        text: 'red',
        color: 'red',

    }, {
        text: 'pink',
        color: 'pink',

    }],
});

export default state