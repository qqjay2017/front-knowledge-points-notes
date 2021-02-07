import React, {memo , FC} from "react";
import './index.scss'
import {useRecoilValue} from "recoil";
import containerAtom, {VisualEditorBlockData} from './atoms/containerAtom'
import {useContainerDrop} from "./useContainerDrop";
import Block from "./Block";
import {useMenuRegistry} from "../MenuList/useMenuRegistry";
import {VisualEditorComponent} from "../../plugins/menu.registry";

interface PageProps {
    blocks:VisualEditorBlockData[],
    componentMap:Record<string, VisualEditorComponent>
}

const Container:FC<PageProps> = memo((props) => {
    const { componentMap , blocks} = props
    const containerStyle = useRecoilValue(containerAtom.containerStyleSelector)
    const {dragenter, dragleave, dragover , drop , onContainerMousedown} = useContainerDrop()
    return <div className="visual-editor-container">
        <div className="visual-editor-content">
            <div className="container"
                 style={containerStyle}
                 onDragEnter={dragenter}
                 onDragLeave={dragleave}
                 onDragOver={dragover}
                 onDrop={drop}
                 onMouseDown={onContainerMousedown}
            >
                {blocks.map(block=><Block key={block.no}
                                          block={block}
                                          render={componentMap[block.componentKey].render}
                />)}
            </div>
        </div>
    </div>
})

export default Container
