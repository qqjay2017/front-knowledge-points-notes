import React, {memo , FC} from "react";
import './index.scss'
import {useRecoilValue} from "recoil";
import containerAtom from './atoms/containerAtom'
import {useContainerDrop} from "./useContainerDrop";
import Block from "./Block";
import {useMenuRegistry} from "../MenuList/useMenuRegistry";
import {VisualEditorComponent} from "../../plugins/menu.registry";

interface PageProps {
    componentMap:Record<string, VisualEditorComponent>
}

const Container:FC<PageProps> = memo((props) => {
    const { componentMap } = props
    const containerStyle = useRecoilValue(containerAtom.containerStyleSelector)
    const blocks =  useRecoilValue(containerAtom.blocksAtom)
    const {dragenter, dragleave, dragover , drop} = useContainerDrop()
    return <div className="visual-editor-container">
        <div className="visual-editor-content">
            <div className="container"
                 style={containerStyle}
                 onDragEnter={dragenter}
                 onDragLeave={dragleave}
                 onDragOver={dragover}
                 onDrop={drop}
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
