import React, {memo} from "react";

import './index.scss'
import MenuList from "./MenuList";
import Operator from "./Operator";
import ContainerHeader from "./ContainerHeader";
import Container from "./Container";
import {useMenuRegistry} from "./MenuList/useMenuRegistry";
import {useRecoilState} from "recoil";
import containerAtom from "./Container/atoms/containerAtom";

const VisualEditor = memo(() => {
    const {menuList , componentMap} =  useMenuRegistry(true)
    const [blocks, setBlocks] = useRecoilState(containerAtom.blocksAtom)

    return (
        <div className="visual-editor">
            <MenuList menuList={menuList} />
            <Operator

            />
            <ContainerHeader
                blocks={blocks}
                setBlocks={setBlocks}
            />
            <Container
                blocks={blocks}
                componentMap={componentMap} />
        </div>
    );
})

export default VisualEditor;
