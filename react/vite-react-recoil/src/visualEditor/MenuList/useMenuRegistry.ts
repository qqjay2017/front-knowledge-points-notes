import {createVisualEditorConfig} from "../../plugins/menu.registry";
import text from './menus/text'
import button from './menus/button'


export function useMenuRegistry() {
    const { registryComponent , componentList , componentMap } = createVisualEditorConfig()
    registryComponent('text',{
        name:'文本',
        render:text.TextRender,
        preview:text.TextPreview
    })
    registryComponent('button',{
        name:'按钮',
        render:button.ButtonRender,
        preview:button.ButtonPreview
    })
    return   {
        componentMap,
        menuList:componentList
    }
}