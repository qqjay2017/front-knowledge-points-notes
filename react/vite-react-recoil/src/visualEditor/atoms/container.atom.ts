import {atom, selector} from "recoil";

export interface VisualEditorBlockData {
    componentKey: string,  // 用key去map里面找组件
    top: number,
    left: number,
    hasAdjustPosition?: boolean; // 是否调整过位置
    focus: boolean;    // 是否被选中
    no: number;   // block的序号
    transform: string;
}


const containerAtom = atom({
    key: 'containerAtom',
    default: {
        style: {
            width: 400,
            height: 800
        }
    }
})




const blocksAtom = atom<VisualEditorBlockData[]>({
    key: 'blocksAtom',
    default: []
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


const blockFocusSelector = selector(
    {
        key: 'blockFocusSelector',
        get: ({get}) => {
            return get(blocksAtom).filter(block=>block.focus)
        }
    }
)


export default  {
    containerAtom,
    containerStyleSelector,
    blocksAtom,
    blockFocusSelector
}
