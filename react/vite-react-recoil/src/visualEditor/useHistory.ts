import {useMemo, useRef} from "react";
import {useSetRecoilState} from "recoil";
import containerAtom from "./atoms/container.atom";
// before 和 after 直接是执行前后的数据
export interface CommandQueueItem {
    before?: any;
    after?: any;
}


export interface Command {
    name: string;
    followQueue:boolean;
    undo?:(args:CommandQueueItem)=> void;
    redo:(args:CommandQueueItem|undefined)=> void;
}

export function useHistory() {
    const curIndex = useRef<number>(-1)
    const queue = useRef<CommandQueueItem[]>([])
    const commandsMap = useRef<Record<string, any>>({})
    const setBlocks = useSetRecoilState(containerAtom.blocksAtom)
    const registry = useMemo(() => {
        return (command: Command) => {
            if(commandsMap.current[command.name]) return
            commandsMap.current[command.name] = (commandQueue?:CommandQueueItem)=>{

                command.redo(commandQueue)
                if(commandQueue && command.followQueue){
                    if(queue.current.length > 0){
                        queue.current = queue.current.slice(0,curIndex.current+1)
                    }
                    queue.current.push(commandQueue)
                    curIndex.current += 1;
                }
            }
        }
    }, [])

    registry({
        name:'undo',
        followQueue:false,
        redo:()=>{
            if(curIndex.current == -1) return
            const queueItem =queue.current[curIndex.current]
            setBlocks(queueItem.before)
            curIndex.current -= 1;
        },
    })

    registry({
        name:'redo',
        followQueue:false,
        redo:()=>{
            // redo的拒绝条件
            if( curIndex.current >= queue.current.length-1) return
            curIndex.current += 1
            const queueItem = queue.current[curIndex.current]
            if(curIndex.current == -1 || !queueItem) return
            setBlocks(queueItem.after)
        },
    })


    registry({
        name:'del',
        followQueue:true,
        undo:({before,after})=>{
            setBlocks(before)
        },
        redo:({before,after}:any)=>{
            setBlocks(after)
        },
    })

    registry({
        name:'drag',
        followQueue:true,
        undo:({before,after})=>{
            setBlocks(before)
        },
        redo:({before,after}:any)=>{
            setBlocks(after)
        },
    })

    registry({
        name:'set',
        followQueue:true,
        undo:({before,after})=>{
            setBlocks(before)
        },
        redo:({before,after}:any)=>{
            setBlocks(after)
        },
    })

    return {
        commandsMap,
        curIndex
    }

}
