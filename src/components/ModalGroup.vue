<template>
    <div class="mw-modal-group">
        <mw-modal v-for="modal of modals"
            v-bind:key="modal.id"
            v-bind:mw-modal-config="modal"
        ></mw-modal>
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
}
</style>
