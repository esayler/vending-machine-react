export default class Treat {
  constructor(name, price) {
    this._name = name || ''
    this._price = price || 75
  }

  get name() {
    return this._name
  }

  get price() {
    return this._price
  }
}
