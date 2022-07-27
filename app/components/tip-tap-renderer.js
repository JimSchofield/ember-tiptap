import Component from '@glimmer/component';
import { compileHBS } from 'ember-repl';
import * as htmlparser2 from 'htmlparser2';
import pascalcase from 'pascalcase';
import render from 'dom-serializer';
// import { convertToEmberMarkup } from '../utils/converter';

import MyCard from './blocks/my-card';

export default class TipTapRendererComponent extends Component {
  get result() {
    let str = '';
    if (this.args.content) {
      const dom = htmlparser2.parseDocument(this.args.content);

      dom.children.forEach((child) => {
        if (child.name === 'ember-component') {
          const componentName = child.attribs['data-component'];

          child.name = pascalcase(componentName);

          child.attribs['component'] = componentName;
          delete child.attribs['data-component'];
        }
      });

      str = render(dom);
    }

    return compileHBS(str, {
      scope: {
        MyCard,
      },
    });
  }
}
