import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import App from './page/app.vue';
import VueRouter from 'vue-router';
import Foo from './page/foo.vue';

Vue.use(ElementUI);
Vue.use(VueRouter);

const routes = [
  {
    path:'/foo',
    component: Foo
  }
];
const router = new VueRouter({routes});
new Vue({
  el:'#app',
  router,
  render:h => h(App)
})
