export interface VisualEditorComponent {
    key: string;
    preview?: () => JSX.Element;
    name: string;
    render?: () => JSX.Element;
}
const componentMap: Record<string, VisualEditorComponent> = {}
const componentList: VisualEditorComponent[] = []

export function createVisualEditorConfig() {
    function registryComponent(key: string, componentWithoutKey: Omit<VisualEditorComponent, 'key'>) {
        // 注册过了,跳过
        if (componentMap[key]) {
            return false
        }
        const componentWithKey: VisualEditorComponent = {
            ...componentWithoutKey,
            key
        }
        componentList.push(componentWithKey)
        componentMap[key] = componentWithKey
    }

    return {
        componentMap,
        componentList,
        registryComponent
    }

}
