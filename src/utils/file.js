const fs = require('fs/promises');

async function safeDelete(filePath) {
  if (!filePath) return;
  try {
    await fs.unlink(filePath);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error('Failed to delete file:', error.message);
    }
  }
}

module.exports = { safeDelete };
