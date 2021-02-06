import {useMemo} from "react";
import {VisualEditorComponent} from "../../plugins/menu.registry";

function useMenuDrag() {
    const onDragStart = useMemo(()=>{
        return (e:React.DragEvent<HTMLDivElement>,component:VisualEditorComponent)=>{
            e.dataTransfer.effectAllowed = "copy";
        }
    },[])
    // const onDragend = useMemo(()=>{
    //     return (e:React.DragEvent<HTMLDivElement>)=>{
    //         console.log('onDragend')
    //     }
    // },[])

    return {
        onDragStart,
        // onDragend
    }
}

export default  useMenuDrag