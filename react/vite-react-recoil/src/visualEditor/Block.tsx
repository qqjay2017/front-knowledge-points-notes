import React, {FC, memo} from "react";

const Block: FC<{ color: string, handleClick: any, handleRemoveItem: any }> = memo((props) => {
    const {color, handleClick, handleRemoveItem} = props
    console.log(color)
    return <div style={{color: color}}>
        {color}
        <button onClick={() => handleClick(color)}>change</button>
        <button
            onClick={() => handleRemoveItem(color)}>delete
        </button>
    </div>
})

export default Block