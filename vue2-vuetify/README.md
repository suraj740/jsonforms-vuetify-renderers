# JSON Forms - More Forms. Less Code

_Complex Forms in the blink of an eye_

JSON Forms eliminates the tedious task of writing fully-featured forms by hand by leveraging the capabilities of JSON, JSON Schema and Javascript.

## Vue 2 Vuetify Renderers

This is the JSON Forms Vue 2 Vuetify renderers package which provides a Vuetify based renderer set for [JSON Forms Vue 2](https://github.com/eclipsesource/jsonforms/blob/master/packages/vue2/vue2).

### Quick start

Install JSON Forms Core, Vue 2 and Vue 2 Vuetify Renderers.

```bash
npm i --save @jsonforms/core @jsonforms/vue @jsonforms/vue-vuetify
```

Use the `json-forms` component for each form you want to render and hand over the renderer set.

```vue
<script>
import { JsonForms } from '@jsonforms/vue';
import { vuetifyRenderers } from '@jsonforms/vue-vuetify';

const renderers = [
  ...vuetifyRenderers,
  // here you can add custom renderers
];

export default defineComponent({
  name: 'app',
  components: {
    JsonForms,
  },
  data() {
    return {
      renderers: Object.freeze(renderers),
      data,
      schema,
      uischema,
    };
  },
  methods: {
    onChange(event) {
      this.data = event.data;
    },
  },
});
</script>
<template>
  <json-forms
    :data="data"
    :schema="schema"
    :uischema="uischema"
    :renderers="renderers"
    @change="onChange"
  />
</template>
```

As JSON Forms uses the Vue 3 composition API you need to add the `@vue/composition-api` plugin to your Vue 2 app.

```ts
import VueCompositionAPI from '@vue/composition-api';

Vue.use(VueCompositionAPI);
```

If note done yet, please [install Vuetify for Vue 2](https://vuetifyjs.com/en/getting-started/installation/).

For more information on how JSON Forms can be configured, please see the [README of `@jsonforms/vue`](https://github.com/eclipsesource/jsonforms/blob/master/packages/vue2/vue2/README.md).

## License

The JSONForms project is licensed under the MIT License. See the [LICENSE file](https://github.com/eclipsesource/jsonforms/blob/master/LICENSE) for more information.
