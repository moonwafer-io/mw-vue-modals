<template>
    <div class="mw-vm-modal" v-bind:id="'mw-vm-modal-' + mwModalConfig.id" v-bind:style="modalStyles">
        <component
            v-bind:is="mwModalConfig.layout.componentName"
            v-bind="{mwModalConfig}"></component>
    </div>
</template>

<script lang="ts">

import { defineComponent, computed } from "vue";

import { useVueModals } from '../index';
import { styleCombiner } from '../utilities';

export default defineComponent({
    props: {
        mwModalConfig: Object
    },
    setup(props) {
        let mwVueModals = useVueModals();

        let modalStyles = computed(() => styleCombiner(
                mwVueModals.getDefaultModalConfig().styleDefaults,
                props.mwModalConfig!.styleOverrides));

        return {
            modalStyles
        }
    },
});
</script>

<style scoped lang="scss">

.mw-vm-modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: auto;
}
</style>
