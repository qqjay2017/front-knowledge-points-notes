import React, {memo} from "react";

import './index.scss'
import MenuList from "./MenuList";
import Operator from "./Operator";
import ContainerHeader from "./ContainerHeader";
import Container from "./Container";
import {useMenuRegistry} from "./MenuList/useMenuRegistry";

const VisualEditor = memo(() => {
    const {menuList , componentMap} =  useMenuRegistry(true)

    return (
        <div className="visual-editor">
            <MenuList menuList={menuList} />
            <Operator />
            <ContainerHeader />
            <Container componentMap={componentMap} />
        </div>
    );
})

export default VisualEditor;
