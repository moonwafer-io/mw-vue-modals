<template>
    <div class="mw-no-layout">
        <component
            v-bind:is="main.name"
            v-bind="main.data"
            v-on="main.eventHandlers"></component>
    </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
    props: {
        mwModalConfig: Object
    },
    setup(props) {
        return {
            // Just for easier reference in the template
            main: props.mwModalConfig!.layout.components.main
        }
    },
});
</script>

<style scoped lang="scss">

.mw-no-layout {
    width: 100%;
    height: 100%;
}
</style>
