

import { App, computed, Ref, ref, reactive } from 'vue';

import ModalGroup from './components/ModalGroup.vue';
import Modal from './components/Modal.vue';
import { ModalConfig, mvcConfig } from './types';

let appRef: App | undefined = undefined;

export default {
    install: (app: App, options: mvcConfig): any => {
        if (!appRef) {
            appRef = app;
            app.config.globalProperties.$mwMVC = new ModalVueComposer(options);

            app.component('mw-modal-group', ModalGroup);
            app.component('mw-modal', Modal);
        }
    }
}

class ModalVueComposer {

    private config: mvcConfig;

    private openModals: ModalConfig[];

    constructor(config: mvcConfig) {
        this.config = config;
        this.openModals = reactive([]);

        // Add some default styles if the user didn't provide any
        if (!this.config.styleDefaults) {
            this.config.styleDefaults = {
                'border': '1px solid black',
                'box-shadow': '0px 0px 20px rgba(0,0,0,0.5)',
                'border-radius': '10px',
                'background': 'gray',
                'width': '600px',
                'height': '300px',
                'padding': '5px',
            }
        }
    }

    createOrUpdateModal(config: ModalConfig) {
        let index = this.openModals.findIndex(m => m.id === config.id);
        if (index === -1) {
            this.openModals.push(config);
        } else {
            this.openModals[index] = config;
        }
    }

    closeModal(id: string) {
        let index = this.openModals.findIndex(m => m.id === id);
        if (index !== -1) {
            this.openModals.splice(index, 1);
        }
    }

    getOpenModals() {
        return this.openModals;
    }

    getDefaultModalConfig() {
        return this.config;
    }

}

export function useModalVueComposer(): ModalVueComposer {
    if (!appRef) {
        throw "Modal Vue Composer plugin was not initialized";
    } else {
        return appRef.config.globalProperties.$mwMVC;
    }
}