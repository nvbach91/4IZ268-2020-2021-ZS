export const MyBlobBuilder = function () {
  this.parts = []
}

MyBlobBuilder.prototype.append = function (part) {
  this.parts.push(part)
  this.blob = undefined // Invalidate the blob
}

MyBlobBuilder.prototype.getBlob = function (type = 'video/mp4') {
  if (!this.blob) {
    this.blob = new Blob(this.parts, { type })
  }
  return this.blob
}
