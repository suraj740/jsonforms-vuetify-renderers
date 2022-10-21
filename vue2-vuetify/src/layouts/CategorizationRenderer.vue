<template>
  <v-container v-if="layout.visible" :class="styles.categorization.root">
    <div
      v-if="appliedOptions.vertical == true"
      v-bind="vuetifyProps('div')"
    >
      <v-col v-bind="vuetifyProps('v-col.v-tabs')">
        <v-tabs
          v-model="activeCategory"
          v-bind="vuetifyProps('v-tabs')"
          vertical
        >
          <v-tab
            v-for="(element, index) in visibleCategories"
            :key="`${layout.path}-${index}`"
          >
            {{ element.label }}
          </v-tab>
        </v-tabs>
      </v-col>
      <v-col v-bind="vuetifyProps('v-col.v-window')">
        <v-window
          v-model="activeCategory"
          vertical
          v-bind="vuetifyProps('v-window')"
        >
          <v-window-item
            v-for="(element, index) in visibleCategories"
            :key="`${layout.path}-${index}`"
          >
            <dispatch-renderer
              :schema="layout.schema"
              :uischema="element"
              :path="layout.path"
              :enabled="layout.enabled"
              :renderers="layout.renderers"
              :cells="layout.cells"
            />
          </v-window-item>
        </v-window>
      </v-col>
    </div>
    <div v-else v-bind="vuetifyProps('div')">
      <v-tabs v-model="activeCategory" v-bind="vuetifyProps('v-tabs')">
        <v-tab
          v-for="(element, index) in visibleCategories"
          :key="`${layout.path}-${index}`"
        >
          {{ element.label }}
        </v-tab>
      </v-tabs>

      <v-window
        v-model="activeCategory"
        v-bind="vuetifyProps('v-window')"
      >
        <v-window-item
          v-for="(element, index) in visibleCategories"
          :key="`${layout.path}-${index}`"
        >
          <dispatch-renderer
            :schema="layout.schema"
            :uischema="element"
            :path="layout.path"
            :enabled="layout.enabled"
            :renderers="layout.renderers"
            :cells="layout.cells"
          />
        </v-window-item>
      </v-window>
    </div>
  </v-container>
</template>

<script lang="ts">
import {
  JsonFormsRendererRegistryEntry,
  Layout,
  rankWith,
  and,
  uiTypeIs,
  Categorization,
  Category,
  Tester,
  isVisible,
  categorizationHasCategory,
} from '@jsonforms/core';
import { defineComponent, ref } from '../vue';
import {
  DispatchRenderer,
  rendererProps,
  useJsonFormsLayout,
  RendererProps,
} from '@jsonforms/vue';
import { useAjv, useVuetifyLayout } from '../util';
import {
  VContainer,
  VTabs,
  VTab,
  VWindow,
  VWindowItem,
  VRow,
  VCol,
} from 'vuetify/components';

const layoutRenderer = defineComponent({
  name: 'categorization-renderer',
  components: {
    DispatchRenderer,
    VContainer,
    VTabs,
    VTab,
    VWindow,
    VWindowItem,
    VRow,
    VCol,
  },
  props: {
    ...rendererProps<Layout>(),
  },
  setup(props: RendererProps<Layout>) {
    const activeCategory = ref(0);
    const ajv = useAjv();

    return {
      ...useVuetifyLayout(useJsonFormsLayout(props)),
      activeCategory,
      ajv,
    };
  },
  computed: {
    visibleCategories(): (Category | Categorization)[] {
      return (this.layout.uischema as Categorization).elements.filter(
        (category: Category | Categorization) =>
          isVisible(category, this.layout.data, this.layout.path, this.ajv)
      );
    },
  },
});

export default layoutRenderer;

export const isSingleLevelCategorization: Tester = and(
  uiTypeIs('Categorization'),
  categorizationHasCategory
);

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: layoutRenderer,
  tester: rankWith(2, isSingleLevelCategorization),
};
</script>
