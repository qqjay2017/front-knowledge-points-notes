import React, {memo} from "react";

import './index.scss'
import {useMenuRegistry} from "./useMenuRegistry";
import useMenuDrag from "./useMenuDrag";

const MenuList = memo(() => {
    const {menuList} =  useMenuRegistry()
    const {onDragStart } = useMenuDrag()
    console.log(menuList,'menuList')
    return <div className="visual-editor-menu">
        {menuList.map(menu=>(<div className="visual-editor-menu-item"
                                  draggable={true}
                                  onDragStart={(e)=>onDragStart(e,menu)}
                                  key={menu.key}>
            <div className="visual-editor-menuItem-label">
                {menu.name}
            </div>
            <div className="visual-editor-menu-item-content">
                <menu.preview />
            </div>

        </div>))}
    </div>
})

export default MenuList