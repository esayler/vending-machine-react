import Treat from './Treat'

export default class VendingMachine {
  constructor() {
    // status can be ["idle", "credited", "vending"]
    this._state = 'idle'
    this._balance = 0
    this._change = 0
    this._selection = null
    this._stock = {
      A0: [],
      A1: [],
      A2: [],
      A3: [],
      A4: [],
      A5: [],
      A6: [],
      A7: [],
      A8: [],
      A9: [],
      B0: [],
      B1: [],
      B2: [],
      B3: [],
      B4: [],
      B5: [],
      B6: [],
      B7: [],
      B8: [],
      B9: [],
    }
  }

  get state() {
    return this._state
  }

  set state(newState) {
    this._state = newState
  }

  get stock() {
    return this._stock
  }

  set stock(newStock) {
    this._stock = newStock
  }

  get balance() {
    return this._balance
  }

  set balance(newBalance) {
    this._balance = newBalance
  }

  get change() {
    return this._change
  }

  set change(newChangeValue) {
    this._change = newChangeValue
  }

  get selection() {
    return this._selection
  }

  set selection(newSelectionValue) {
    try {
      this.validateSetSelection(newSelectionValue)
    } catch (e) {
      this._selection = null
      console.log(e)
    }
  }

  addBalance(amount) {
    const curr = this._balance
    const next = curr + amount
    this._balance = next
    this._state = 'credited'
  }

  clearBalance() {
    this._balance = 0
    this._state = 'idle'
  }

  clearStock() {
    this._stock = {
      A0: [],
      A1: [],
      A2: [],
      A3: [],
      A4: [],
      A5: [],
      A6: [],
      A7: [],
      A8: [],
      A9: [],
      B0: [],
      B1: [],
      B2: [],
      B3: [],
      B4: [],
      B5: [],
      B6: [],
      B7: [],
      B8: [],
      B9: [],
    }
  }

  restock() {
    for (let i = 0; i < 10; i += 1) {
      this._stock['A0'].push(new Treat('Bertie Bott\'s Every Flavour Beans', 75))
      this._stock['A1'].push(new Treat('Chocolate Frog', 75))
      this._stock['A2'].push(new Treat('Fizzing Whizzbees', 75))
      this._stock['A3'].push(new Treat('Skiving Snackbox', 2000))
      this._stock['A4'].push(new Treat('Acid Pops', 75))
      this._stock['A5'].push(new Treat('Cauldron Cake', 75))
      this._stock['A6'].push(new Treat('Puking Pastille', 75))
      this._stock['A7'].push(new Treat('Nosebleed Nougat', 75))
      this._stock['A8'].push(new Treat('Fever Fudge', 75))
      this._stock['A9'].push(new Treat('Fainting Fancies', 75))
      this._stock['B0'].push(new Treat('Candyfloss', 75))
      this._stock['B1'].push(new Treat('Drooble\'s Best Blowing Gum', 75))
      this._stock['B2'].push(new Treat('Ton-Tongue Toffee', 75))
      this._stock['B3'].push(new Treat('Explosive Fairy Dust', 75))
      this._stock['B4'].push(new Treat('Cockroach Clusters', 75))
      this._stock['B5'].push(new Treat('Jelly Slugs', 75))
      this._stock['B6'].push(new Treat('Liquorice Wands', 75))
      this._stock['B7'].push(new Treat('Sugar Quills', 75))
      this._stock['B8'].push(new Treat('Pumpkin Pasties', 75))
      this._stock['B9'].push(new Treat('Self-Flossing Mints', 75))
    }
  }

  validateSetSelection(selection) {
    const validSelections = Object.keys(this._stock)
    if (validSelections.indexOf(selection) === -1) {
      throw new Error('not a valid selection')
    } else {
      this._selection = selection
    }
  }

  validateBalance() {
    const itemStock = this._stock[this._selection]
    const item = itemStock[itemStock.length - 1]
    if (this._balance < item.price) {
      throw new Error('not enough balance')
    }
  }

  validateStock() {
    const itemStock = this._stock[this._selection]
    if (itemStock.length === 0) {
      throw new Error('no stock left')
    }
  }

  popTreat() {
    const itemStock = this._stock[this._selection]
    if (itemStock.length === 0) {
      throw new Error('no stock left')
    }

    return itemStock.pop()
  }
}
