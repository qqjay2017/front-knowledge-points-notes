import React, { useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import atoms from "../store/atoms";

function VisualEditor() {
  const [blocks, setBlocks] = useRecoilState(atoms.block);

  function replaceItemAtIndex<T>(arr: T[], index: number, newValue: T) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
  }
  const [, forceUpdate] = useState(0);

  const rgb = useMemo(() => {
    return () => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return "rgb(" + r + "," + g + "," + b + ")";
    };
  }, []);
  const handleClick = useMemo(() => {
    return (index: number) => {
      blocks[index] = { color: rgb(), text: "111" };
      forceUpdate((n) => n + 1);
    };
  }, []);
  return (
    <div>
      {blocks.map((block, index) => (
        <div
          key={block.color}
          style={{ color: block.color }}
          onClick={() => handleClick(index)}
        >
          {block.color}
        </div>
      ))}
    </div>
  );
}

export default VisualEditor;
