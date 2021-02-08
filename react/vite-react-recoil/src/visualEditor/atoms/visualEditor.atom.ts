import {atom} from "recoil";
import {VisualEditorComponent} from "../../plugins/menu.registry";

/**
 * 通过这个atom,各个组件之间共享数据
 */

const droppingComponent = atom<VisualEditorComponent>({
    key:'droppingComponent',
    default: {
        key:'',
        name:''
    }
})

export default {
    droppingComponent
}
