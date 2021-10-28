<template>
    <div class="mw-modal" v-on:click.stop v-bind:style="modalStyles">
        <component
            v-bind:is="mwModalConfig.layout.name"
            v-bind="{mwModalConfig}"></component>
    </div>
</template>

<script lang="ts">

import { defineComponent, computed } from "vue";

import { useModalVueComposer } from '../index';

export default defineComponent({
    props: {
        mwModalConfig: Object
    },
    setup(props) {
        let mwMVC = useModalVueComposer();

        let modalStyles = computed(() => {
            // Start with the base styling
            let computedStyles = JSON.parse(JSON.stringify(mwMVC.getDefaultModalConfig().styleDefaults));

            // Now override anything in the mwModalConfig prop
            if (props.mwModalConfig!.styleOverrides) {
                for (let key of Object.keys(props.mwModalConfig!.styleOverrides)) {
                    computedStyles[key] = props.mwModalConfig!.styleOverrides[key];
                }
            }

            return computedStyles;
        });

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
