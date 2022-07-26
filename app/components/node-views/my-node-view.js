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
          tag: 'div[data-component]',
          getAttrs: (dom) => {
            const type = dom.getAttribute('data-component');
            const localId = dom.getAttribute('id');

            return types.indexOf(type) > -1
              ? {
                  type,
                  localId,
                  get node() {
                    return document.querySelector(`#${localId}`);
                  },
                }
              : false;
          },
        },
      ];
    },
    renderHTML({ HTMLAttributes }) {
      return ['div', mergeAttributes(HTMLAttributes)];
    },
    addNodeView() {
      return ({ node }) => {
        const div = document.createElement('div');

        div.setAttribute('id', node.attrs.id);
        div.setAttribute('data-component', node.attrs['data-component']);

        return {
          dom: div,
        };
      };
    },
  });
}
