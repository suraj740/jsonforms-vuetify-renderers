/**
 * Switch between Vue 3 and Vue 2 '@vue/composition-api'.
 */
export {
  computed,
  defineComponent,
  inject,
  onBeforeMount,
  onUnmounted,
  provide,
  reactive,
  ref,
  unref,
  watch,
  watchEffect,
} from 'vue';
export type { Ref, ComputedRef } from 'vue';
/**
 * Compatibility type as defineComponent of '@vue/composition-api' can't properly handle PropTypes.
 */
export type CompType<_S, V> = V;
