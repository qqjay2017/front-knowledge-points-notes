import React, {FC, memo, useEffect, useMemo} from "react";
import './index.scss'
import {Button, Tooltip} from "antd";
import {SetterOrUpdater, useRecoilValue,} from "recoil";
import containerAtom ,{VisualEditorBlockData } from "../atoms/container.atom";
import {createFromIconfontCN} from '@ant-design/icons';

import {KeyboardCode} from "./keyboard-code";


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
    const {blocks, setBlocks, commandsMap } = props

    const onKeydown = useMemo(() => {
        return (e: KeyboardEvent) => {
            e.stopPropagation()
            e.preventDefault()
            if (document.activeElement !== document.body) {
                return
            }
            const keys: string[] = []
            // 'ctrl+shift+alt+e' 按顺序走
            if (e.ctrlKey || e.metaKey) {
                keys.push('ctrl')
            }
            if (e.shiftKey) {
                keys.push('shift')
            }
            if (e.altKey) {
                keys.push('alt')
            }
            if (e.keyCode) {
                keys.push(KeyboardCode[e.keyCode])
            }
            if (keys.length == 0) {
                return;
            }
            const keyString = keys.join('+')

            const button = buttons.find(b => {
                let isSame = false;
                if (typeof b.keyboard == 'string') {
                    isSame = !!(b.keyboard === keyString);
                } else if (Array.isArray(b.keyboard)) {
                    isSame = b.keyboard.indexOf(keyString) >= 0
                }
                if (isSame) {
                    return true
                } else {
                    return false
                }
            })
            if(button){
                button.handle()
            }else {
                return false
            }
        }
    }, [blocks])

    useEffect(() => {

        window.addEventListener('keydown', onKeydown)
        return () => {
            window.removeEventListener('keydown', onKeydown)
        }
    }, [])

    const {unFocusBlock , focusBlock} = useRecoilValue(containerAtom.blockSelector)

    const buttons = useMemo(() => {
        return [
            {
                name: '撤销',
                icon: 'icon-back',
                tooltip: '撤销(ctrl+z)',
                key: 'undo',
                keyboard: 'ctrl+z',
                handle: () => {
                    commandsMap.current.undo()
                }
            },
            {
                name: '恢复',
                icon: 'icon-forward',
                tooltip: '恢复(ctrl+y)',
                key: 'redo',
                keyboard: 'ctrl+y',
                handle: () => {
                    commandsMap.current.redo()
                }
            },
            {
                name: '删除',
                icon: 'icon-delete',
                tooltip: '删除(Delete/Backspace)',
                key: 'del',
                keyboard: ['delete', 'backspace'],
                handle: () => {
                    if(focusBlock.length==0) return
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
        {buttons.map(button => (
            <Tooltip title={button.tooltip}
                     key={button.key}>
                {/*<Button  icon={<SearchOutlined/>}/>*/}
                <div
                    onClick={() => button.handle()}
                    className="header-button">
                    <IconFont type={button.icon}/>
                </div>
            </Tooltip>))}
    </div>
})

export default ContainerHeader
