import React, {FC, memo, useMemo} from "react";
import './index.scss'
import historyAtom from './history.atom'
import {Button} from "antd";
import {SetterOrUpdater, useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {VisualEditorBlockData} from "../Container/atoms/containerAtom";
interface PageProps {
    blocks:VisualEditorBlockData[],
    setBlocks:SetterOrUpdater<VisualEditorBlockData[]>
}

const ContainerHeader: FC<PageProps> = memo((props) => {
    const { blocks ,setBlocks} = props

    const [curBlock,handleUndo] = useRecoilState( historyAtom.undoSelector)
    const commandHistory = useRecoilValue(historyAtom.blockHistoryAtom)
    const Buttons = useMemo(() => {
        return [
            {name: '撤销', key: 'undo', handle: () => {




                }},
            {name: '删除', key: 'del', handle: () => {}},
        ]
    }, [blocks , commandHistory])

    console.log('渲染header')
    return <div className="visual-editor-header">
        {Buttons.map(button => (<Button
            key={button.key}
            onClick={button.handle}>{button.name}</Button>))}
    </div>
})

export default ContainerHeader