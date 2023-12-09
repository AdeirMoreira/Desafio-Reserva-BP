import { VS } from 'vuesax';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $vs: VS;
  }
}