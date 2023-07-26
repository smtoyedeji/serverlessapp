let data = [
  {
    "id": 1,
    "name": "spoon"
  },
  {
    "id": 2,
    "name": "knife"
  },
]

// create operation
module.exports.create = async (event) => {
  const newItem = JSON.parse(event.body)
  data.push(newItem)

  return {
    statusCode: 201,
    success: true,
    body: JSON.stringify(data)
  }
}

// read operation
module.exports.read = async (event) => {
  return {
    statusCode: 200,
    success: true,
    body: JSON.stringify(data)
  }
}

//update
module.exports.update = async (event) => {
  const updatedItem = JSON.parse(event.body)
  const index = data.findIndex(item => item.id === updatedItem.id)

  if (index !== -1) {
    data[index] = updatedItem;
    return {
      statusCode: 200,
      success: true,
      body: JSON.stringify(updatedItem)
    }
  } else {
    return {
      statusCode: 404,
      success: false,
      body: JSON.stringify({message: 'Item not found'})
    }
  }
}

// delete operation
module.exports.delete = async (event) => {
  const id = event.pathParameters.id
  const index = data.findIndex(item => item.id === id)

  if (index !== -1) {
    const deletedItem = data.splice(index, 1)
    return {
      statusCode: 200,
      success: true,
      body: JSON.stringify(deletedItem[0])
    }
  } else {
    return {
      statusCode: 404,
      success: false,
      body: JSON.stringify({message: 'Item not found'})
    }
  }
}
