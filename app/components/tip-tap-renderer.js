import Component from '@glimmer/component';
import { compileHBS } from 'ember-repl';
import { convertToEmberMarkup } from '../utils/converter';

import MyCard from './blocks/my-card';

export default class TipTapRendererComponent extends Component {
  get result() {
    const str = convertToEmberMarkup(this.args.content);

    return compileHBS(str, {
      scope: {
        MyCard,
      },
    });
  }
}
