import React, {FC, memo, useMemo} from "react";
import './index.scss'
import {Button} from "antd";
import {SetterOrUpdater, useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {VisualEditorBlockData} from "../atoms/container.atom";
interface PageProps {
    blocks:VisualEditorBlockData[],
    setBlocks:SetterOrUpdater<VisualEditorBlockData[]>
}

const ContainerHeader: FC<PageProps> = memo((props) => {
    const { blocks ,setBlocks} = props
    const Buttons = useMemo(() => {
        return [
            {name: '撤销', key: 'undo', handle: () => {

                }},
            {name: '删除', key: 'del', handle: () => {}},
        ]
    }, [blocks ])

    console.log('渲染header')
    return <div className="visual-editor-header">
        {Buttons.map(button => (<Button
            key={button.key}
            onClick={button.handle}>{button.name}</Button>))}
    </div>
})

export default ContainerHeader
