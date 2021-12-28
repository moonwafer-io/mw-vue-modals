<template>
    <div class="mw-vm-no-layout">
        <component
            v-bind:is="main.componentName"
            v-bind="main.componentData"
            v-bind:style="mainStyles"
            v-on="main.eventHandlers || {}"></component>
    </div>
</template>

<script lang="ts">

import { computed, defineComponent } from "vue";

import { styleCombiner } from '../../utilities';

export default defineComponent({
    props: {
        mwModalConfig: Object
    },
    setup(props) {
        let main = props.mwModalConfig!.layout.panes.main;
        let mainStyles = computed(() => styleCombiner({}, main.styleOverrides));

        return {
            main, mainStyles,
        }
    },
});
</script>

<style scoped lang="scss">

.mw-vm-no-layout {
    width: 100%;
    height: 100%;
}
</style>
