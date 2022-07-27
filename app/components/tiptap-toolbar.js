import Component from '@glimmer/component';

export default class TiptapToolbarComponent extends Component {
  addMyCard = () => {
    // Poor man's uuid :D
    const id = 'A' + String(Math.floor(Math.random() * 100000));

    this.args.editor.commands.insertContent(
      `<ember-component id="${id}" data-component="my-card"></ember-component>`
    );

    this.args.addEditorComponent({
      type: 'my-card',
      id,
    });
  };
}
