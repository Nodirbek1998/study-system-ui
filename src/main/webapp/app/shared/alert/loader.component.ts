import { Component, PropSync, Vue } from 'vue-property-decorator';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
@Component({
  components: {
    PulseLoader,
  },
})
export default class LoaderComponent extends Vue {
  @PropSync('isShow', { type: Boolean, default: false }) syncedIsShow!: boolean;
}
