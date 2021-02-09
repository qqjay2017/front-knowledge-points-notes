import {memo , FC} from "react";
import './index.scss'
import {useRecoilValue} from "recoil";
import containerAtom, {VisualEditorBlockData} from '../atoms/container.atom'
import {useContainerDrop} from "./useContainerDrop";
import Block from "./Block";
import {VisualEditorComponent} from "../../plugins/menu.registry";

interface PageProps {
    blocks:VisualEditorBlockData[]
    componentMap:Record<string, VisualEditorComponent>;
    commandsMap:any
}

const Container:FC<PageProps> = memo((props) => {
    const { componentMap , blocks , commandsMap} = props
    const containerStyle = useRecoilValue(containerAtom.containerStyleSelector)
    const {dragenter, dragleave, dragover , drop , onContainerMousedown} = useContainerDrop(commandsMap)
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
                                          commandsMap={commandsMap}
                                          render={componentMap[block.componentKey].render}
                />)}
            </div>
        </div>
    </div>
})


1


export default Container
