import {Modal, ModalFuncProps} from "antd";
import ReactDOM from 'react-dom'
// see https://github.com/ant-design/ant-design/blob/master/components/modal/confirm.tsx

type ConfigUpdate = ModalFuncProps | ((prevConfig: ModalFuncProps) => ModalFuncProps);

export const destroyFns: Array<() => void> = [];

export default function dialogBaseService(config: ModalFuncProps, DialogBody?: (() => JSX.Element)) {
    const div = document.createElement('div')
    document.body.appendChild(div);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    let currentConfig = {...config, close, visible: true} as any

    function destroy(...args: any[]) {

        const unmountResult = ReactDOM.unmountComponentAtNode(div)

        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div)
        }

        const triggerCancel = args.some(param => param && param.triggerCancel);
        if (config.onCancel && triggerCancel) {
            config.onCancel(...args);
        }


        for (let i = 0; i < destroyFns.length; i++) {
            const fn = destroyFns[i];
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            if (fn === close) {
                destroyFns.splice(i, 1);
                break;
            }
        }

    }

    function render({okText, cancelText, prefixCls, ...props}: any) {
        setTimeout(() => {
            ReactDOM.render(
                <Modal
                    {...props}
                    onCancel={() => close({triggerCancel: true})}
                    okText={okText}
                    cancelText={cancelText}
                >
                    {DialogBody && <DialogBody/>}
                </Modal>,
                div
            )
        })
    }

    function close(...args: any[]) {
        currentConfig = {
            ...currentConfig,
            visible: false,
            afterClose: () => {
                if (typeof config.afterClose === 'function') {
                    config.afterClose();
                }
                // @ts-ignore
                destroy.apply(this, args);
            },
        };

        render(currentConfig)
    }

    function update(configUpdate: ConfigUpdate) {
        if (typeof configUpdate === 'function') {
            currentConfig = configUpdate(currentConfig);
        } else {
            currentConfig = {
                ...currentConfig,
                ...configUpdate,
            };
        }
        render(currentConfig);
    }

    render(currentConfig);

    destroyFns.push(close);

    return {
        destroy: close,
        update,
    };

}
