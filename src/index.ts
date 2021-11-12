

import { App, computed, Ref, ref, reactive } from 'vue';

import { ModalConfig, mvcConfig } from './types';

// Modal Components
import ModalGroup from './components/ModalGroup.vue';
import Modal from './components/Modal.vue';
// Layout Components
import NoLayout from './components/layouts/NoLayout.vue';
import FixedBottom from './components/layouts/FixedBottom.vue';

let appRef: App | undefined = undefined;

export default {
    install: (app: App, options: mvcConfig): any => {
        if (!appRef) {
            appRef = app;
            app.config.globalProperties.$mwMVC = new ModalVueComposer(options);

            // Modal Components
            app.component('mw-modal-group', ModalGroup);
            app.component('mw-modal', Modal);
            // Layout Components
            app.component('mw-no-layout', NoLayout);
            app.component('mw-fixed-bottom', FixedBottom);

            // Add a global listener to close certain modals when the user clicks outside of them.
            document.addEventListener('click', (event) => {
                app.config.globalProperties.$mwMVC.clickOutsideToCloseModals(event);
            });
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
                'padding': '5px',
            }
        }
    }

    createOrUpdateModal(config: ModalConfig) {
        setTimeout(() => {
            let index = this.openModals.findIndex(m => m.id === config.id);
            if (index === -1) {
                this.openModals.push(config);
            } else {
                this.openModals[index] = config;
            }
        }, 0);
    }

    closeModal(id: string) {
        let index = this.openModals.findIndex(m => m.id === id);
        if (index !== -1) {
            this.openModals.splice(index, 1);
        }
    }

    clickOutsideToCloseModals(event: any) {
        // Iterating backwards to avoid removing items from the list interfering with the iteration
        for (let i = this.openModals.length-1; i >= 0; i--) {
            if (this.openModals[i].clickOutsideToClose) {
                let modal = document.getElementById('mw-modal-' + this.openModals[i].id);
                if (!modal?.contains(event.target)) {
                    this.closeModal(this.openModals[i].id);
                }
            }
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