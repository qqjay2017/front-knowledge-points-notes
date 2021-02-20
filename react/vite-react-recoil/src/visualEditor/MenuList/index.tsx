import  {FC, memo} from "react";

import './index.scss'
import useMenuDrag from "./useMenuDrag";
import {VisualEditorComponent} from "../../plugins/menu.registry";

interface PageProps {
    menuList:VisualEditorComponent[]
}

const MenuList:FC<PageProps> = memo(( props ) => {
    const {menuList} = props
    const {onDragStart , onDragend} = useMenuDrag()
    return <div className="visual-editor-menu">
        {menuList.map(menu => (<div className="visual-editor-menu-item"
                                    draggable={true}
                                    onDragStart={(e) => onDragStart(e, menu)}
                                    onDragEnd={onDragend}
                                    key={menu.key}>
            <div className="visual-editor-menuItem-label">
                {menu.name}
            </div>
            <div className="visual-editor-menu-item-content">
                {menu.preview && <menu.preview/>}
            </div>

        </div>))}
    </div>
})

export default MenuList
