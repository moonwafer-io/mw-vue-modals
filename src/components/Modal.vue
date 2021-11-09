<template>
    <div class="mw-modal" v-on:click.stop v-bind:style="modalStyles">
        <component
            v-bind:is="mwModalConfig.layout.componentName"
            v-bind="{mwModalConfig}"></component>
    </div>
</template>

<script lang="ts">

import { defineComponent, computed } from "vue";

import { useModalVueComposer } from '../index';
import { styleCombiner } from '../utilities';

export default defineComponent({
    props: {
        mwModalConfig: Object
    },
    setup(props) {
        let mwMVC = useModalVueComposer();

        let modalStyles = computed(() => styleCombiner(
                mwMVC.getDefaultModalConfig().styleDefaults,
                props.mwModalConfig!.styleOverrides));

        return {
            modalStyles
        }
    },
});
</script>

<style scoped lang="scss">

.mw-modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: auto;
}
</style>
