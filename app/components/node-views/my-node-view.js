import { Node, mergeAttributes } from '@tiptap/core';

export default function createComponentNods(types) {
  return Node.create({
    name: 'component',
    group: 'block',
    atom: true,
    draggable: true,
    addAttributes() {
      return {
        id: {},
        'data-component': {},
      };
    },
    parseHTML() {
      return [
        {
          tag: 'ember-component',
          getAttrs: (dom) => {
            const type = dom.getAttribute('data-component');
            const id = dom.getAttribute('id');

            return types.indexOf(type) > -1
              ? {
                  type,
                  get node() {
                    return document.querySelector(`#${id}`);
                  },
                }
              : false;
          },
        },
      ];
    },
    renderHTML({ HTMLAttributes }) {
      return ['ember-component', mergeAttributes(HTMLAttributes)];
    },
    addNodeView() {
      return ({ node }) => {
        const div = document.createElement('ember-component');

        div.setAttribute('id', node.attrs.id);
        div.setAttribute('data-component', node.attrs['data-component']);

        return {
          dom: div,
        };
      };
    },
  });
}
