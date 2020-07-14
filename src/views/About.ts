import Vue from 'vue';
import Components from 'vue-class-component';

@Components({
  name: 'about',
})
export default class About extends Vue {
  protected authors: any[] = [
    {
      id: 1,
      name: 'Jeremia Jason Lasiman',
      nim: '13514021',
      image: 'images/Jeje.jpg'
    },
    {
      id: 2,
      name: 'Bervianto Leo Pratama',
      nim: '13514047',
      image: 'images/Bervi.jpg'
    },
    {
      id: 3,
      name: 'M. Az-zahid Adhitya Silparensi',
      nim: '13514095',
      image: 'images/Zahid.jpg'
    }
  ]
}
