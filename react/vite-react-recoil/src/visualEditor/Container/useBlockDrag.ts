import containerAtom, {VisualEditorBlockData} from "./atoms/containerAtom";
import {useMemo, useRef} from "react";
import {useSetRecoilState} from "recoil";
import {replaceItemWithCompare} from "../../store/utils";

export function useBlockDrag(block: VisualEditorBlockData) {

    const setBlocks = useSetRecoilState(containerAtom.blocksAtom)
    const dragData = useRef<{ startX: number; startY: number; }>({
        startX: 0,
        startY: 0
    })

    const mousemoveEventListener = useMemo(()=>{
        return (e:MouseEvent)=>{
            const durX = e.clientX - dragData.current.startX;
            const durY = e.clientY - dragData.current.startY;
            setBlocks(blocks=>replaceItemWithCompare(
                blocks,
                b=>b.focus,
                {transform:`translate( ${durX}px, ${durY}px)`}
            ))
        }
    },[])

    const mouseupEventListener = useMemo(()=>{
        return (e:MouseEvent)=>{

        }
    },[])

    const onMouseDown = useMemo(() => {
        return (e: React.MouseEvent<HTMLDivElement>) => {

            if (e.shiftKey && !block.focus) {
                setBlocks(blocks => replaceItemWithCompare(blocks,
                    (b) => b.no == block.no,
                    {
                        ...block,
                        focus: true
                    }
                ))
            }
            // 拖拽模式
            if (!e.shiftKey && block.focus) {
                // 记录拖拽开始的位置
                dragData.current = {
                    startX:e.clientX,
                    startY:e.clientY
                }
                document.addEventListener('mousemove',mousemoveEventListener)
                document.addEventListener('mouseup',mouseupEventListener)
            }
            // 单击未选中
            if (!e.shiftKey && !block.focus) {
                // 未选中的
                // 设定只有这个是focus,其他都取消focus
                setBlocks(Blocks => Blocks.map(b => {
                    if (b.no == block.no) {
                        return {
                            ...b,
                            focus: true
                        }
                    } else {
                        return {
                            ...b,
                            focus: false
                        }
                    }
                }))
            }
        }
    }, [block])

    return {
        onMouseDown
    }
}
