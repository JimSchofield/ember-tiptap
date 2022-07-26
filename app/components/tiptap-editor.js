import Component from '@glimmer/component';
import StarterKit from '@tiptap/starter-kit';
import { Editor } from '@tiptap/core';
import { modifier } from 'ember-modifier';
import { registerDestructor } from '@ember/destroyable';
import { tracked } from '@glimmer/tracking';

import MyNodeView from './node-views/my-node-view';
import MyCard from './blocks/my-card';

const COMPONENTS = ['my-card'];

const COMPONENT_MAP = {
  'my-card': MyCard,
};

export default class TiptapEditorComponent extends Component {
  @tracked html;
  @tracked json;

  @tracked editorComponents;

  setupEditor = modifier((element) => {
    const editor = new Editor({
      element,
      extensions: [StarterKit, MyNodeView(COMPONENTS)],
      content: this.args.initialContent || '<p>Edit here</p>',
    });

    this.editor = editor;

    this._setValues();

    editor.on('update', () => {
      this._setValues();
    });

    this.editorComponents = this.parseDocForComponents(editor);

    registerDestructor(this, () => this.editor.destroy());
  });

  _setValues = () => {
    const html = this.editor.getHTML();
    const json = this.editor.getJSON();

    this.html = html;
    this.json = json;

    if (this.args.onUpdate) {
      this.args.onUpdate({ html, json });
    }
  };

  getComponentByType = (type) => COMPONENT_MAP(type).component;

  parseDocForComponents(editor) {
    return editor.state.doc.content.content.reduce((components, node) => {
      if (node.type.name === 'component') {
        components.push({
          type: node.attrs['data-component'],
          localId: node.attrs.id,
          get node() {
            return document.querySelector(`#${node.attrs.id}`);
          },
        });
      }

      return components;
    }, []);
  }
}
