import {useMemo} from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import visualEditorAtom from '../visualEditor.atom'
import containerAtom from "./atoms/containerAtom";
import {VisualEditorComponent} from "../../plugins/menu.registry";
function createNewBlock({ component, top, left, no }:{
    component:VisualEditorComponent;
    top: number;
    left: number;
    no: number;
}) {
    return {
        hasAdjustPosition: false,
        componentKey: component.key,
        top, left,
        focus: false,
        no,
        transform:'translate(0, 0)'
    };
}


export function useContainerDrop() {
    const droppingComponent = useRecoilValue(visualEditorAtom.droppingComponent)
    const setBlocks = useSetRecoilState(containerAtom.blocksAtom)
    const dragenter = useMemo(() => {
        return (e: React.DragEvent<HTMLDivElement>) => {
             e.dataTransfer.dropEffect = 'copy'
        }
    }, [])

    const dragleave = useMemo(() => {
        return (e: React.DragEvent<HTMLDivElement>) => {
            e.dataTransfer.dropEffect = 'none'
        }
    }, [])

    const dragover = useMemo(() => {
        return (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault()
        }
    }, [])

    const drop = useMemo(() => {
        return (e: React.DragEvent<HTMLDivElement>) => {
            setBlocks(blocks=>{
                const lastNo = blocks.length > 0 ? blocks[blocks.length - 1].no : 0;
                return [...blocks,createNewBlock(
                    {
                        component:droppingComponent,
                        top: e.nativeEvent.offsetY,
                        left: e.nativeEvent.offsetX,
                        no: lastNo + 1,
                    }
                )]
            })
        }
    }, [droppingComponent])

    return {
        dragenter,
        dragleave,
        dragover,
        drop
    }
}
