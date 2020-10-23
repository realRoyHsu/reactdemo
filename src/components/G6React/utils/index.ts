function findNextNodes(
  editor: {
    getNodes: () => any;
    update: (arg0: any, arg1: { showAnchor: boolean }) => void;
  },
  currentItem: { id: any }
): void {
  const nodes = editor.getNodes();
  nodes
    .filter((v: { id: any }) => v.id !== currentItem.id)
    .forEach((node: any) => {
      editor.update(node, {
        showAnchor: true,
      });
    });
}

export default {
  findNextNodes,
};
