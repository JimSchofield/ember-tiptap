import { Node, mergeAttributes } from '@tiptap/core';

export default Node.create({
  name: 'myNodeView',
  group: 'block',
  atom: true,
  draggable: true,
  addAttributes() {
    return {
      id: {},
    };
  },
  parseHTML() {
    return [
      {
        tag: 'my-card',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['my-card', mergeAttributes(HTMLAttributes)];
  },
  addNodeView() {
    return ({ node }) => {
      const div = document.createElement('div');

      div.innerHTML = `My Node View! id: ${node.attrs.id}`;

      return {
        dom: div,
      };
    };
  },
});
