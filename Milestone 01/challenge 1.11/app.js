const express = require('express')
require('dotenv').config()

const app = express()

app.use(express.json())

// Import routes
const confessionRoutes = require('./routes/confessionRoutes')

// Use routes
app.use('/api/v1', confessionRoutes)

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

try {
  require('./routes/confessionRoutes')
  console.log("Routes loaded ✅")
} catch (e) {
  console.error("Routes error ❌", e)
}