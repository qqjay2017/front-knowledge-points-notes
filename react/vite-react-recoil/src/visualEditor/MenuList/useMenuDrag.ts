import {useMemo} from "react";
import {VisualEditorComponent} from "../../plugins/menu.registry";
import {useResetRecoilState, useSetRecoilState} from 'recoil'
import visualEditorAtom from '../atoms/visualEditor.atom'

function useMenuDrag() {

    const setDroppingComponent = useSetRecoilState(visualEditorAtom.droppingComponent)
    const resetDroppingComponent = useResetRecoilState(visualEditorAtom.droppingComponent)
    const onDragStart = useMemo(() => {
        return (e: React.DragEvent<HTMLDivElement>, component: VisualEditorComponent) => {
            setDroppingComponent(()=>component)
            e.dataTransfer.effectAllowed = "copy";
        }
    }, [])
    const onDragend = useMemo(() => {
        return (e: React.DragEvent<HTMLDivElement>) => {
            resetDroppingComponent()
        }
    }, [])
    return {
        onDragStart,
        onDragend
    }
}

export default useMenuDrag
