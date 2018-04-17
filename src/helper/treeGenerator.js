const createTree = function(itemCount, nestedCount) {

  const createNodes = function (parent_id, nestedCount) {
    const nodes = []
    for (let i = 1; i <= itemCount; i++) {
      const parent = parent_id
      const id= parent_id + '_' + i
      const label = 'Item ' + id
      nodes.push({
        id,
        label,
        parent,
        isExpanded: false,
        children: nestedCount > 0
          ? createNodes(id, nestedCount -1 )
          : undefined
      })
    }
    return nodes
  }
  return {
    id: 'ID_1',
    label: 'Root',
    isExpanded: true,
    children: createNodes('ID_1', nestedCount -1)
  }
}

export default createTree