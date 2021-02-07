import {atom, selector} from "recoil";
import {VisualEditorBlockData} from "../Container/atoms/containerAtom";

const blockHistoryAtom = atom<{
    past: VisualEditorBlockData[];
    present: VisualEditorBlockData|undefined;
    future: VisualEditorBlockData[]
}>({
    key: 'blockHistoryAtom',
    default: {
        past: [],
        present: undefined,
        future: []
    }
})

const undoSelector = selector({
    key: 'blockHistoryUndoSelector',
    get: ({get}) => get(blockHistoryAtom),
    set: ({set}) => {
        set(blockHistoryAtom, (state:any) => {
           const {past, present, future} = state
            const previous = past[past.length - 1];
            const newPast = past.slice(0, past.length - 1);
            const undoRes = {
                past: newPast,
                present: previous,
                future: [present].concat(future)
            }
            console.log(undoRes, 'undoRes')
            return undoRes
        })

    }
})

const setSelector = selector<{ newPresent?: VisualEditorBlockData } | any>({
    key: 'blockHistorySetSelector',
    get: () => ({}),
    set: ({set}, payload:any) => {
        set(blockHistoryAtom, (state) => {
            const {newPresent} = payload
            const {past, present} = state
            const newState = {
                past: present && present.componentKey ? [...past,present,newPresent] : [...past,newPresent],
                present: newPresent,
                future: []
            }
            console.log(newState)
            return newState
        })
    }
})



export default {
    blockHistoryAtom,
    undoSelector,
    setSelector
}