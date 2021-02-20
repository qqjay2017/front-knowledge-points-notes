import  {FC, memo, useMemo, useRef} from "react";
import {VisualEditorBlockData} from "../atoms/container.atom";
import './block.scss'
import {useAdjustPosition} from "./useAdjustPosition";
import {useBlockDrag} from "./useBlockDrag";

interface PageProps {
    block: VisualEditorBlockData;
    render: (() => JSX.Element) | undefined;
    commandsMap:any
}

const Block: FC<PageProps> = memo((props) => {
    const {block, render , commandsMap} = props
    const blockRef = useRef<HTMLDivElement>(null)
    // 调整位置
     useAdjustPosition(block, blockRef)
    const {onMouseDown} = useBlockDrag(block,commandsMap)
    // 控制block不受其他数据影响而重新渲染
    const BlockMemo = useMemo(()=>{
        return ()=>{
            return <div
                ref={blockRef}
                className={`block ${block.focus?'block-focus':''}`}
                style={{left: block.left + 'px', top: block.top + 'px',transform:block.transform}}
                onMouseDown={(e) => onMouseDown(e)}
            >{render && render()}</div>
        }
    },[block])

    return <BlockMemo />
})

export default Block
