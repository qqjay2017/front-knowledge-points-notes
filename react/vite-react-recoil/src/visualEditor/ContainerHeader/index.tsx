import React, {FC, memo, useMemo} from "react";
import './index.scss'
import {Button, Tooltip} from "antd";
import {SetterOrUpdater,} from "recoil";
import {VisualEditorBlockData} from "../atoms/container.atom";
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
    scriptUrl: 'src/iconfont/iconfont.js',
});

import produce from 'immer'

interface PageProps {
    blocks: VisualEditorBlockData[];
    setBlocks: SetterOrUpdater<VisualEditorBlockData[]>;
    commandsMap: any;
}


const ContainerHeader: FC<PageProps> = memo((props) => {
    const {blocks, setBlocks, commandsMap} = props


    const Buttons = useMemo(() => {
        return [
            {
                name: '撤销',
                icon:'icon-back',
                tooltip: '撤销(ctrl+z)',
                key: 'undo', handle: () => {
                    commandsMap.current.undo()
                }
            },
            {
                name: '恢复',
                icon:'icon-forward',
                tooltip: '恢复(ctrl+y)',
                key: 'redo', handle: () => {
                    commandsMap.current.redo()
                }
            },
            {
                name: '删除',
                icon:'icon-delete',
                tooltip: '删除(Delete/Backspace)',
                key: 'del', handle: () => {
                    commandsMap.current.del({
                        before: blocks,
                        after: produce(blocks, draft => {
                            return draft.filter(d => !d.focus)
                        })
                    })

                }
            },
        ]
    }, [blocks])

    return <div className="visual-editor-header">
        {Buttons.map(button => (
            <Tooltip title={button.tooltip}
                     key={button.key}>
                {/*<Button  icon={<SearchOutlined/>}/>*/}
               <div
                   onClick={()=>button.handle()}
                   className="header-button">
                   <IconFont type={button.icon}  />
               </div>
            </Tooltip>))}
    </div>
})

export default ContainerHeader
