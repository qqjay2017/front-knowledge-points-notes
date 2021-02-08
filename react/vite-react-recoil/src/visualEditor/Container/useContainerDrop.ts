import {useMemo} from "react";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import visualEditorAtom from '../atoms/visualEditor.atom'
import containerAtom from "../atoms/container.atom";
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
    const { focusBlock } =  useRecoilValue(containerAtom.blockSelector)
    const [blocks,setBlocks] = useRecoilState(containerAtom.blocksAtom)
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
    }, [droppingComponent,blocks])

    const onContainerMousedown = useMemo(()=>{

        return (e:React.MouseEvent<HTMLDivElement>)=>{
            if(!focusBlock || focusBlock.length ==0){
                return false
            }
            setBlocks(blocks=>blocks.map(block=>({...block,focus:false})))
        }
    },[focusBlock])

    return {
        dragenter,
        dragleave,
        dragover,
        drop,
        onContainerMousedown
    }
}
