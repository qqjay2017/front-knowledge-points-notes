import {atom, selector} from "recoil";

const containerAtom = atom({
    key: 'containerAtom',
    default: {
        style: {
            width: 400,
            height: 800
        }
    }
})
const containerStyleSelector = selector(
    {
        key: 'containerStyleSelector',
        get: ({get}) => {
            const style = get(containerAtom).style
            return {width: style.width + 'px', height: style.height + 'px'}
        }
    }
)

export default  {
    containerAtom,
    containerStyleSelector
}