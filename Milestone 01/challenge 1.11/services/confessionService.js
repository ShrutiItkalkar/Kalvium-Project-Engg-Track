let confessions = []
let confessionIdCounter = 0

const categories = ["bug", "deadline", "imposter", "vibe-code"]

// Handles creation logic
function createConfession(data) {
  if (!data || !data.text) {
    return { error: 'need text', status: 400 }
  }

  if (data.text.length === 0) {
    return { error: 'too short', status: 400 }
  }

  if (data.text.length > 500) {
    return { error: 'text too big', status: 400 }
  }

  if (!categories.includes(data.category)) {
    return { error: 'invalid category', status: 400 }
  }

  const newConfession = {
    id: ++confessionIdCounter,
    text: data.text,
    category: data.category,
    created_at: new Date()
  }

  confessions.push(newConfession)

  return { data: newConfession, status: 201 }
}

// Get all
function getAllConfessions() {
  const sorted = confessions.sort((a, b) => b.created_at - a.created_at)

  return {
    data: sorted,
    count: sorted.length
  }
}

// Get by ID
function getConfessionById(id) {
  const confession = confessions.find(c => c.id === id)

  if (!confession) {
    return { error: 'not found', status: 404 }
  }

  return { data: confession }
}

// Get by category
function getByCategory(category) {
  if (!categories.includes(category)) {
    return { error: 'invalid category', status: 400 }
  }

  const filtered = confessions
    .filter(c => c.category === category)
    .reverse()

  return { data: filtered }
}

// Delete
function deleteConfession(id, token) {
  if (token !== 'supersecret123') {
    return { error: 'no permission', status: 403 }
  }

  const index = confessions.findIndex(c => c.id === id)

  if (index === -1) {
    return { error: 'not found', status: 404 }
  }

  const deletedItem = confessions.splice(index, 1)

  return { data: deletedItem[0] }
}

module.exports = {
  createConfession,
  getAllConfessions,
  getConfessionById,
  getByCategory,
  deleteConfession
}