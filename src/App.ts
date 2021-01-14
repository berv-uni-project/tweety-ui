import { Vue } from 'vue-property-decorator';
import Components from 'vue-class-component';
import TopNav from '@/components/top-nav/TopNav.vue';
@Components({
  name: 'app',
  components: {
    'top-nav': TopNav
  }
})
export default class App extends Vue {
}
