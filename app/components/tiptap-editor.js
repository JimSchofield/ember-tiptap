import Component from '@glimmer/component';
import StarterKit from '@tiptap/starter-kit';
import { Editor } from '@tiptap/core';
import { modifier } from 'ember-modifier';
import { registerDestructor } from '@ember/destroyable';
import { tracked } from '@glimmer/tracking';
import { convertToTiptapMarkup } from '../utils/converter';

import MyNodeView from './node-views/my-node-view';

export default class TiptapEditorComponent extends Component {
  @tracked html;
  @tracked json;

  setupEditor = modifier((element) => {
    // const initialContent = convertToTiptapMarkup(this.args.initialContent);

    const editor = new Editor({
      element,
      extensions: [StarterKit, MyNodeView],
      content: this.args.initialContent || '<p>Edit here</p>',
    });

    this.editor = editor;

    this._setValues();

    editor.on('update', () => {
      this._setValues();
    });

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
}
