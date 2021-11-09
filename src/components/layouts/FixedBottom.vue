<template>
    <div class="mw-fixed-bottom">
        <div class="mw-main">
            <component
                v-bind:is="main.componentName"
                v-bind="main.componentData"
                v-bind:style="mainStyles"
                v-on="main.eventHandlers"></component>
        </div>
        <div class="mw-bottom">
            <component
                v-bind:is="bottom.name"
                v-bind="bottom.data"
                v-bind:style="bottomStyles"
                v-on="bottom.eventHandlers"></component>
        </div>
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
        let main   = props.mwModalConfig!.layout.panes.main;
        let bottom = props.mwModalConfig!.layout.panes.bottom;

        let mainStyles   = computed(() => styleCombiner({ 'max-height': '500px', }, main.styleOverrides));
        let bottomStyles = computed(() => styleCombiner({}, bottom.styleOverrides));

        return {
            main,   mainStyles,
            bottom, bottomStyles,
        }
    },
});
</script>

<style scoped lang="scss">

.mw-fixed-bottom {
    width: 100%;
    height: 100%;

    .mw-main {
        overflow: auto;
    }
    .mw-bottom {
    }
}
</style>
