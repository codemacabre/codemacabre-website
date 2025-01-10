import { visit } from 'unist-util-visit';

export const preventEllipsis = () => {
  return (tree) => {
    visit(tree, 'text', (node) => {
      if (node.value.includes('…')) {
        node.value = node.value.replace(/…/g, '...');
      }
    });
  };
};
