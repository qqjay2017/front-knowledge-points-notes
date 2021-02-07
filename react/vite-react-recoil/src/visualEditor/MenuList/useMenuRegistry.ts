import {createVisualEditorConfig} from "../../plugins/menu.registry";
import text from './menus/text'
import button from './menus/button'
import input from './menus/input'


export function useMenuRegistry(flag?:boolean) {
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
    registryComponent('input',{
        name:'输入框',
        render:input.InputRender,
        preview:input.InputPreview
    })
    return   {
        componentMap,
        menuList:componentList
    }
}
