import { Node, mergeAttributes } from '@tiptap/core';

export default Node.create({
  name: 'myNodeView',
  group: 'block',
  atom: true,
  draggable: true,
  parseHTML() {
    return [
      {
        tag: 'MyNodeView',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['MyNodeView', mergeAttributes(HTMLAttributes)];
  },
  addNodeView() {
    return () => {
      const div = document.createElement('div');

      div.innerHTML = 'My Node View!';

      return {
        dom: div,
      };
    };
  },
});
