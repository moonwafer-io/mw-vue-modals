
# Introduction

This is a Vue 3 library for showing modals to the user. There are a few built-in modal layouts, but you can easily create your own custom layouts if desired. This supports binding data into the modals, and reacting to events thrown by the modals.

# Installation

Download from NPM:

```bash
# Yarn
yarn install mw-vue-modals

# NPM
npm install mw-vue-modals
```

Add to your Vue instance:

```javascript
import MWVueModals from 'mw-vue-modals';
app.use(MWVueModals, {
    // You can optionally provide some "styleDefaults" which will be used as the default style for all of your modals.
    // These can be overridden on a modal-by-modal basis if desired.
    styleDefaults: {
        'background': 'linear-gradient(60deg, #B35F87 16.54%, #3B1A52 80.98%)',
        'border': '1px solid black',
        'border-radius': '8px',
        'box-shadow': '0px 0px 20px rgba(0,0,0,0.5)',
        'width': '500px',
        'padding': '3px',
    }
});
```

Add this tag to your top-level Vue component. This is where all of your modal elements will be mounted into the DOM.
```html
<mw-vm-modal-group></mw-vm-modal-group>
```

# Usage

To show a new modal:

```javascript
import { useVueModals } from 'mw-vue-modals';

const mwVueModals = useVueModals();

mwVueModals.createOrUpdateModal(/* Configuration object goes here */);
```

The bare minimum configuration object consists of an id, layout, and one or more panes:

```javascript
const config = {
    id: 'example-modal',
    layout: {
        componentName: 'mw-vm-no-layout',
        panes: {
            'main': { componentName: 'my-modal-contents' }
        }
    }
}
```

* The `id` identifies the component if you'd like to update or delete it later.
* The `layout` defines the top-level structure of the component - ie, which panes exist and where they go. The `componentName` determines which layout you use (here, `mw-no-layout`).We have a couple built-in layouts, documented below.
* A pane is one section of the layout. Panes will have different identifiers (ex: `main`) depending on which layout you use. The contents of a pane are determined by the provided `componentName` (here, `my-modal-contents`).

To close a modal:
```javascript
// The provided ID matches the ID you used when creating the modal.
mwVueModals.closeModal('example-modal');
```

# Configuration

When opening a new modal, you provide a configuration object that defines everything about the modal, from its contents to its event handlers. Aside from the "bare minimum" example above, all keys are optional.

```javascript
// The below "config" example binds this reactive object into the modal
let myBoundObject = reactive({ mwSampleData: "Hello, world!" });

const config = {
    // An identifier for this modal. Can be any string, but should be unique across your application.
    id: 'example-modal',

    // If set to true, then clicking anywhere outside the modal will cause the modal to close.
    clickOutsideToClose: false,

    // Allows you to define styles that apply to the entire modal. Overrides whatever was provided
    // when the library was initialized.
    styleOverrides: {
        'border': '2px solid blue',
        'color': 'white',
    },

    layout: {
        // Defines the component to use for this modal's layout. The layout determines which "panes"
        // exist inside this modal and where they go. There are a couple built-in layouts documented
        // below, but you can also create your own layouts by creating a custom component.
        componentName: 'mw-vm-fixed-bottom',

        panes: {
            // Your chosen layout (above) defines which keys you use to identify each pane. In this
            // example, the 'mw-vm-fixed-bottom' layout has a 'main' pane and a 'bottom' pane. Each
            // pane is configured with separate values, but use the same keys.
            'main': {
                // This component defines the 'main' pane's contents.
                componentName: 'my-modal-content',

                // Binds myBoundObject into my-modal-content. The keys of myBoundObject should match
                // the vue props defined on my-modal-content.
                componentData: myBoundObject,

                // Allows you to override any styles the chosen layout had predefined for this pane.
                styleOverrides: {
                    'max-height': '500px',
                },

                // Allows you to catch and handle any events thrown by this pane ('my-modal-content')
                eventHandlers: {
                    // Each key handles a different type of event. The key defines the name of the
                    // event to handle, and the event data is passed into the given handler.
                    'my-close-event': (event: any) => {
                        mwVueModals.closeModal(id);
                    },
                }
            },

            // The chosen layout (mw-vm-fixed-bottom) also takes a 'bottom' pane, defined here.
            'bottom': {
                // Omitted for brevity. Same keys as the other pane(s), though you would provide
                // different values.
            }
        }
    }
}
```

# Layouts

A layout defines the top-level sections ("panes") for your modal. For example, you might have a layout that has three panes stacked on top of each other: a fixed-height titlebar, a "main" section that expands to fill available space, and a fixed-height footer that has a "Save" and "Cancel" button. Or maybe a layout that has two side-by-side panes: a fixed-width left pane for navigation, and an expanding right pane showing the contents.

We have a couple built-in layouts you can use, but it's also easy to define your own.

## Built-In

### `mw-vm-no-layout`

The "no layout" layout has just a single pane called `main` which takes up the full space of the dialog. Here's a barebones example config using this layout:

```javascript
const config = {
    id: 'example-modal',
    layout: {
        componentName: 'mw-vm-no-layout',
        panes: {
            'main': { componentName: 'my-modal-contents' }
        }
    }
}
```

### `mw-vm-fixed-bottom`

The "fixed bottom" layout has two panes: a `main` section that grows in height up to 500px before scrolling, and a fixed-height `bottom` section. Here's a barebones example config:

```javascript
const config = {
    id: 'example-modal',
    layout: {
        componentName: 'mw-vm-fixed-bottom',
        panes: {
            'main':   { componentName: 'my-modal-contents', styleOverrides: { 'max-height': '200px' } }, // Default max height of 500px. Overridden here as an example.
            'bottom': { componentName: 'my-modal-footer' }
        }
    }
}
```

## Custom

To create your own layout, create and register a new global Vue component. It should accept a single Vue property called `mwModalConfig` which equals the modal configuration object passed in when creating your modal. (`{ id, clickOutsideToClose, styleOverrides, layout: { componentName, panes } }`)

You'll want to bind the componentName, componentData, event handlers, and a styles object to each pane inside your layout. The styles object should be a combination of default styles for that pane, and any styleOverrides the user provided. For example:

```xml
<!-- The "main" component -->
<component
    v-bind:is="main.componentName"
    v-bind="main.componentData"
    v-bind:style="mainStyles"
    v-on="main.eventHandlers || {}"></component>
```

where

```javascript
export default defineComponent({
    props: {
        mwModalConfig: Object
    },
    setup(props) {
        // Broken down for convenience
        let main = props.mwModalConfig!.layout.panes.main;

        // "styleCombiner()" is available for your convenience. Accepts 2 objects, default styles and overrides, and returns a single, combined object.
        let mainStyles = computed(() => styleCombiner({ 'max-height': '500px', }, main.styleOverrides));

        return {
            main,   mainStyles,
        }
    },
});
```

I recommend using the built-in layouts as reference: (`./src/components/layouts/*`)

If you create a custom layout that you think will be useful to others, feel free to submit a PR!