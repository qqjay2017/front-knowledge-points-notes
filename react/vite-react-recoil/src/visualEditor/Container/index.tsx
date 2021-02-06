import React, {memo} from "react";
import './index.scss'
import {useRecoilValue} from "recoil";
import containerAtom from './atoms/containerAtom'
import {useContainerDrop} from "./useContainerDrop";

const Container = memo(() => {
    const containerStyle = useRecoilValue(containerAtom.containerStyleSelector)
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

            </div>
        </div>
    </div>
})

export default Container