<template>
    <div class="mw-modal-group">
        <transition-group name="mw-open-close">
            <mw-modal v-for="modal of modals"
                v-bind:key="modal.id"
                v-bind:mw-modal-config="modal"
            ></mw-modal>
        </transition-group>
    </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

import { useModalVueComposer } from '../index';

export default defineComponent({
    props: {},
    setup() {
        let mwMVC = useModalVueComposer();

        let modals = mwMVC.getOpenModals();

        return {
            modals,
        }
    },
});
</script>

<style scoped lang="scss">
.mw-modal-group {
    position: fixed;
    z-index: 1000;
    width: 100vw;
    height: 100vh;
    pointer-events: none;

    .mw-open-close-enter-active,.mw-open-close-leave-active {
        transition: transform 0.1s, opacity 0.1s;
    }
    .mw-open-close-enter-from,.mw-open-close-leave-to {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.7);
    }
}
</style>
