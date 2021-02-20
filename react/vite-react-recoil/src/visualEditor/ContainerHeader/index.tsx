import {FC, memo, useCallback, useEffect, useMemo, useRef} from "react";
import './index.scss'
import {Button, notification, Tooltip, Input, message} from "antd";
import {SetterOrUpdater, useRecoilState, useRecoilValue,} from "recoil";
import containerAtom, {VisualEditorBlockData} from "../atoms/container.atom";
import {createFromIconfontCN} from '@ant-design/icons';

import {KeyboardCode} from "./keyboard-code";
import dialogBaseService from "../service/dialogBaseService";

const IconFont = createFromIconfontCN({
    scriptUrl: 'src/iconfont/iconfont.js',
});

import produce from 'immer'
import button from "../MenuList/menus/button";

interface PageProps {
    blocks: VisualEditorBlockData[];
    setBlocks: SetterOrUpdater<VisualEditorBlockData[]>;
    commandsMap: any;
}

interface HeaderButtons {
    name: string;
    icon: string;
    tooltip?: string;
    key: string;
    keyboard: string | string[];
    handle: () => void
}


const ContainerHeader: FC<PageProps> = memo((props) => {
    const {blocks, setBlocks, commandsMap} = props

    const blockFocus = useRecoilValue(containerAtom.blockFocusSelector)

    const [containerModel,setContainerModel] = useRecoilState(containerAtom.containerAtom)

    const onKeydown = useCallback((e: KeyboardEvent) => {

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
        const button = commandButtons.find(b => {
            let isSame = false;
            if (typeof b.keyboard == 'string') {
                isSame = !!(b.keyboard && b.keyboard === keyString);
            } else if (Array.isArray(b.keyboard)) {
                isSame = !!(b.keyboard && b.keyboard.indexOf(keyString) >= 0)
            }

            if (isSame) {
                return true
            } else {
                return false
            }
        })
        if (button) {
            e.stopPropagation()
            e.preventDefault()

            button.handle()
        } else {
            return false
        }
    }, [blocks])

    const importDialogText = useRef<string>('')

    /**
     * TODO 如何才能不重新addEvent?
     * */
    useEffect(() => {

        window.addEventListener('keydown', onKeydown)
        return () => {
            window.removeEventListener('keydown', onKeydown)
        }
    }, [blocks])


    const commandButtons: HeaderButtons[] = useMemo(() => {
        return [
            {
                name: '撤销',
                icon: 'icon-back',
                tooltip: '撤销(ctrl+z)',
                key: 'undo',
                keyboard: 'ctrl+z',
                handle: () => {
                    const args = {
                        message: '执行撤销操作',
                        duration: 0.8,
                    };
                    notification.open(args);
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
                    const args = {
                        message: '执行恢复操作',
                        duration: 0.8,
                    };
                    notification.open(args);
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
                    if (blockFocus.length == 0) return
                    const args = {
                        message: '执行删除操作',
                        duration: 0.8,
                    };
                    notification.open(args);
                    commandsMap.current.del({
                        before: blocks,
                        after: produce(blocks, draft => {
                            return draft.filter(d => !d.focus)
                        })
                    })

                }
            },
            {
                name: '全选',
                icon: 'icon-entypomenu',
                tooltip: '全选(ctrl+a)',
                key: 'selectAll',
                keyboard: 'ctrl+a',
                handle: () => {
                    const args = {
                        message: '执行全选操作',
                        duration: 0.8,
                    };
                    notification.open(args);
                    commandsMap.current.set({
                        before: blocks,
                        after: produce(blocks, draft => {
                            return draft.map(d => ({
                                ...d,
                                focus: true
                            }))
                        })
                    })
                }
            },
            {
                name: '清空',
                icon: 'icon-reset',
                tooltip: '清空',
                key: 'reset',
                keyboard: '',
                handle: () => {
                    const args = {
                        message: '执行清空操作',
                        duration: 0.8,
                    };
                    notification.open(args);
                    commandsMap.current.set({
                        before: blocks,
                        after: []
                    })
                }
            },
        ]
    }, [blocks])

    const onTextAreaChange = useMemo(() => {
        return (e: React.ChangeEvent<HTMLTextAreaElement>
        ) => {
            importDialogText.current = e.target.value
        }
    }, [])

    const importButtons: HeaderButtons[] = useMemo(() => {
        return [
            {
                name: '导入',
                icon: 'icon-import',
                tooltip: '',
                key: 'import',
                keyboard: '',
                handle: () => {
                    const {destroy} = dialogBaseService({
                        title: '导入数据',
                        onOk() {
                            try {
                                const text = importDialogText.current;
                                if (!text) {
                                    return message.warn('输入为空')
                                }
                                const textJson = JSON.parse(text)
                                textJson.container && setContainerModel(textJson.container)
                                textJson.blocks && setBlocks(textJson.blocks)
                                destroy()
                            } catch (e) {
                                message.warn('输入的json格式不对')
                            }

                        }
                    }, () => <Input.TextArea
                        rows={10}
                        defaultValue={``} onChange={v => onTextAreaChange(v)}/>)
                }
            },
            {
                name: '导出',
                icon: 'icon-export',
                tooltip: '',
                key: 'export',
                keyboard: '',
                handle: () => {
                    const {destroy} = dialogBaseService({
                        title: '导出数据',
                        onOk() {
                            // 执行确认操作
                            console.log('ok')
                            destroy()
                        }
                    },() =>{
                        const defaultValueJSON = {
                            container:containerModel,
                            blocks:blocks
                        }
                        return  <Input.TextArea
                            rows={10}
                            defaultValue={JSON.stringify(defaultValueJSON)} />
                    })
                }
            },
        ]
    }, [blocks,containerModel ,setContainerModel , setBlocks])

    const buttonRender = useMemo(() => {
        return (button: HeaderButtons) => {
            return <div
                key={button.key}
                onClick={() => button.handle()}
                className="header-button">
                <IconFont type={button.icon}/>
            </div>
        }
    }, [])

    const buttonWithTooltip = useMemo(() => {
        return (button: HeaderButtons) => (
            button.tooltip ?
                <Tooltip title={button.tooltip}
                         key={button.key}>
                    {buttonRender(button)}
                </Tooltip> : buttonRender(button))
    }, [])


    return <div className="visual-editor-header">
        <div className="command-buttons buttons-wrap">
            {commandButtons.map(button => (
                buttonWithTooltip(button)))}
        </div>
        <div className="command-buttons buttons-wrap">
            {importButtons.map(button => {
                return buttonWithTooltip(button)
            })}
        </div>


    </div>
})

export default ContainerHeader
