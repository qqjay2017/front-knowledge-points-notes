import React, {FC, memo, useRef} from "react";
import {VisualEditorBlockData} from "../atoms/container.atom";
import './block.scss'
import {useAdjustPosition} from "./useAdjustPosition";
import {useBlockDrag} from "./useBlockDrag";

interface PageProps {
    block: VisualEditorBlockData,
    render: (() => JSX.Element) | undefined
}

const Block: FC<PageProps> = memo((props) => {
    const {block, render} = props
    const blockRef = useRef<HTMLDivElement>(null)
    // 调整位置
    useAdjustPosition(block, blockRef)
    const {onMouseDown} = useBlockDrag(block)

    console.log(block)

    return <div
        ref={blockRef}
        className={`block ${block.focus?'block-focus':''}`}
        style={{left: block.left + 'px', top: block.top + 'px',transform:block.transform}}
        onMouseDown={(e) => onMouseDown(e)}
    >{render && render()}</div>
})

export default Block
