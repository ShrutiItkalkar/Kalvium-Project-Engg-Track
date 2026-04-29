const service = require('../services/confessionService')

// Controller handles request & response

exports.createConfession = (req, res) => {
  const result = service.createConfession(req.body)

  if (result.error) {
    return res.status(result.status).json({ msg: result.error })
  }

  res.status(result.status).json(result.data)
}

exports.getAllConfessions = (req, res) => {
  const result = service.getAllConfessions()
  res.json(result)
}

exports.getConfessionById = (req, res) => {
  const id = parseInt(req.params.id)
  const result = service.getConfessionById(id)

  if (result.error) {
    return res.status(result.status).json({ msg: result.error })
  }

  res.json(result.data)
}

exports.getByCategory = (req, res) => {
  const result = service.getByCategory(req.params.cat)

  if (result.error) {
    return res.status(result.status).json({ msg: result.error })
  }

  res.json(result.data)
}

exports.deleteConfession = (req, res) => {
  const id = parseInt(req.params.id)
  const token = req.headers['x-delete-token']

  const result = service.deleteConfession(id, token)

  if (result.error) {
    return res.status(result.status).json({ msg: result.error })
  }

  res.json({ msg: 'ok', item: result.data })
}