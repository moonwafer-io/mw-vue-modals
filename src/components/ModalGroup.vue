<template>
    <div class="mw-vm-modal-group">
        <transition-group name="mw-vm-open-close">
            <mw-vm-modal v-for="modal of modals"
                v-bind:key="modal.id"
                v-bind:mw-modal-config="modal"
            ></mw-vm-modal>
        </transition-group>
    </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

import { useVueModals } from '../index';

export default defineComponent({
    props: {},
    setup() {
        let mwVueModals = useVueModals();

        let modals = mwVueModals.getOpenModals();

        return {
            modals,
        }
    },
});
</script>

<style scoped lang="scss">
.mw-vm-modal-group {
    position: fixed;
    z-index: 1000;
    width: 100vw;
    height: 100vh;
    pointer-events: none;

    .mw-vm-open-close-enter-active,.mw-vm-open-close-leave-active {
        transition: transform 0.1s, opacity 0.1s;
    }
    .mw-vm-open-close-enter-from,.mw-vm-open-close-leave-to {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.7);
    }
}
</style>
