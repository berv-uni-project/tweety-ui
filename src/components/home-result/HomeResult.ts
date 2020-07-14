import Vue from 'vue';
import Components from 'vue-class-component';

@Components({
  name: 'home-result',
  props: {
    result: Object
  }
})
export default class HomeResult extends Vue {
}
