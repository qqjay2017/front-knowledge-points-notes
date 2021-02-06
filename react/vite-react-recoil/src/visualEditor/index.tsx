import React, {useMemo, useState} from "react";
import {useRecoilState} from "recoil";
import atoms from "../store/atoms";
import {addItem, replaceItemAtIndex, replaceItemWithCompare} from "../store/utils";
import Block from "./Block";

import './index.scss'
import MenuList from "./MenuList";
import Operator from "./Operator";
import ContainerHeader from "./ContainerHeader";
import Container from "./Container";

function VisualEditor() {
    const [blocks, setBlocks] = useRecoilState(atoms.block);


    const rgb = useMemo(() => {
        return () => {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            return "rgb(" + r + "," + g + "," + b + ")";
        };
    }, []);
    const handleClick = useMemo(() => {
        return (color: string) => {
            setBlocks(blocks => {
                console.log(blocks, 'blocks')
                return replaceItemWithCompare(blocks,
                    (block) => block.color == color,
                    {color: rgb(), text: "111"})
            })
        };
    }, []);

    const handleAddItem = useMemo(() => {
        return () => {
            setBlocks(block => {
                return addItem(block, {color: rgb(), text: "111"})
            })
        }
    }, [])

    const handleRemoveItem = useMemo(() => {
        return (color: string) => {
            setBlocks(blocks => {
                return replaceItemWithCompare(blocks, (block) => block.color == color)
            })
        }
    }, [])
    return (
        <div className="visual-editor">
            <MenuList />
            <Operator />
            <ContainerHeader />
            <Container />
        </div>
    );
}

export default VisualEditor;
