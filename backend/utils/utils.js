const toBytes = ({ size, unit }) => {
  if (unit == 'GB') {
    return size * 1024 * 1024 * 1024
  }
  if (unit == 'MB') {
    return size * 1024 * 1024
  }
  if (unit == 'KB') {
    return size * 1024
  }
  if (unit == 'Byte') {
    return size
  }
}

module.exports = {
  toBytes,
}
