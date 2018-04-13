const createTree = function(itemCount, nestedCount) {

  const createNodes = function (parent_id, nestedCount) {
    const nodes = []
    for (let i=0; i<itemCount; i++) {
      const id= parent_id + '_' + i
      const label = 'Item ' + id
      nodes.push({
        id,
        label,
        children: nestedCount > 0
          ? createNodes(id, nestedCount -1 )
          : undefined
      })
    }
    return nodes
  }
  return createNodes('ID', nestedCount -1)
}

export default createTree