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

function guid() {
  return "xxxxxxxx".replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0;
    let v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default {
  guid,
  findNextNodes,
};
