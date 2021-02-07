import {useMemo} from "react";

function createBlock() {

}


export function useContainerDrop() {
    const dragenter = useMemo(() => {
        return (e: React.DragEvent<HTMLDivElement>) => {
            // console.log( e.dataTransfer.dropEffect)
            // e.dataTransfer.dropEffect = 'copy'

        }
    }, [])

    const dragleave = useMemo(() => {
        return (e: React.DragEvent<HTMLDivElement>) => {
            e.dataTransfer.dropEffect = 'none'
        }
    }, [])

    const dragover = useMemo(() => {
        return (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault()
        }
    }, [])

    const drop = useMemo(() => {
        return (e: React.DragEvent<HTMLDivElement>) => {
            console.log('drop触发')
        }
    }, [])

    return {
        dragenter,
        dragleave,
        dragover,
        drop
    }
}