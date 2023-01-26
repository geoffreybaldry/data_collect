const toBytes = ({ size, unit }) => {
  if (unit == 'TB') {
    return Math.round(size) * 1024 * 1024 * 1024 * 1024
  } else if (unit == 'GB') {
    return Math.round(size) * 1024 * 1024 * 1024
  } else if (unit == 'MB') {
    return Math.round(size) * 1024 * 1024
  } else if (unit == 'KB') {
    return Math.round(size) * 1024
  } else if (unit == 'Byte') {
    return Math.round(size)
  } else {
    throw new Error(
      'toBytes unable to convert input object to bytes (' +
        size +
        ' ' +
        unit +
        ')'
    )
  }
}

module.exports = {
  toBytes,
}
