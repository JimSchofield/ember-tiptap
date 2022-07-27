import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class BlocksMyCardComponent extends Component {
  @tracked value = "It's live!";

  onInput = (event) => (this.value = event.target.value);
}
