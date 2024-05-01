import { App } from 'vue'

import Icon from './Icon/index.vue'
export default function (app: App<Element>) {
  app.component('Icon', Icon)
}
