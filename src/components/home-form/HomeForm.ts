import Vue from 'vue';
import Components from 'vue-class-component';

@Components({
  name: 'home-form',
  props: {
    form: Object,
    submitData: Function
  }
})
export default class HomeForm extends Vue {
}
