import {useEffect} from "react";
import {useSetRecoilState} from "recoil";
import containerAtom, {VisualEditorBlockData} from "../atoms/container.atom";
import {replaceItemWithCompare} from "../../store/utils";
export function useAdjustPosition(block:VisualEditorBlockData,ref:React.RefObject<HTMLDivElement>){
   const setBlocks =   useSetRecoilState(containerAtom.blocksAtom)
    useEffect(()=>{
        if(!block.hasAdjustPosition){
            const offsetWidth =  ref.current?.offsetWidth || 0;
            const offsetHeight =  ref.current?.offsetHeight || 0
            setBlocks(blocks =>replaceItemWithCompare(blocks,
                (b)=>{return b.no ==block.no} ,
                {...block,
                    hasAdjustPosition:true,
                    left:block.left - offsetWidth / 2 ,
                    top:block.top - offsetHeight/2
                }
            ))
        }

    },[])
}
