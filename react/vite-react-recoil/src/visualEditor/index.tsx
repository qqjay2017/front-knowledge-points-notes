import  {memo} from "react";

import './index.scss'
import MenuList from "./MenuList";
import Operator from "./Operator";
import ContainerHeader from "./ContainerHeader";
import Container from "./Container";
import {useMenuRegistry} from "./MenuList/useMenuRegistry";
import {useRecoilState} from "recoil";
import containerAtom from "./atoms/container.atom";
import {useHistory} from "./useHistory";



const VisualEditor = memo(() => {
    const {menuList , componentMap} =  useMenuRegistry(true)
    const [blocks, setBlocks] = useRecoilState(containerAtom.blocksAtom)
    const {commandsMap , curIndex} = useHistory()
    return (
        <div className="visual-editor">
            <MenuList menuList={menuList} />
            <Operator

            />
            <ContainerHeader
                blocks={blocks}
                setBlocks={setBlocks}
                commandsMap={commandsMap}
            />
            <Container
                blocks={blocks}
                componentMap={componentMap}
                commandsMap={commandsMap}
            />
        </div>
    );
})

export default VisualEditor;
