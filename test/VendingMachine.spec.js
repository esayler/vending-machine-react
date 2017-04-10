import chai from 'chai'
import VendingMachine from '../src/helpers/VendingMachine'
import Treat from '../src/helpers/Treat'

var expect = chai.expect
chai.should()

describe('VendingMachine', () => {
  describe('initial state', () => {
    let vm

    beforeEach(() => {
      vm = new VendingMachine()
    })

    it('should have an initial balance value of 0', () => {
      vm.should.have.property('_balance')
        .that.is.a('number')
        .that.equals(0)
    })

    it('should have an initial state value of "idle"', () => {
      vm.should.have.property('_state')
        .that.is.a('string')
        .that.equals('idle')
    })

    it('should have an initial selection value of null', () => {
      vm.should.have.property('_selection')
        .that.equals(null)
    })

    it('should have initial change value of 0', () => {
      vm.should.have.property('_change')
        .that.is.a('number')
    })

    it('should have no initial stock of treats', () => {
      vm.should.have.property('_stock')
        .that.is.an('object')
        .and.deep.equal({
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
        })
    })

    it('should have stock of treats after restocking', () => {
      vm.restock()
      vm.should.have.property('_stock')
        .that.is.an('object')
        .and.not.deep.equal({
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
        })
    })

    it('should have default stock of 10 treats per slot after restocking', () => {
      vm.restock()
      vm.should.have.property('_stock')
        .that.is.an('object')
        .which.has.property('A1')
        .that.has.lengthOf(10)
    })
  })

  describe('balance', () => {
    let vm

    beforeEach(() => {
      vm = new VendingMachine()
    })

    afterEach(() => {
    })

    it('should accept a certain amount of credits', () => {
      vm.addBalance(75)
      vm.balance.should.equal(75)
    })

    it('should be able to clear credits', () => {
      vm.addBalance(75)
      vm.balance.should.equal(75)
      vm.clearBalance()
      vm.balance.should.equal(0)
    })
  })

  describe('treat selection', () => {
    let vm

    beforeEach(() => {
      vm = new VendingMachine()
      vm.restock()
    })

    it('should be able to accept a selection', () => {
      const selection = vm.selection
      expect(selection).to.be.not.ok
      vm.selection = 'A1'
      vm.should.have.property('_selection')
        .that.equals('A1')
    })

    it('should be able to validate a selection', () => {
      vm.selection = 'A1'
      vm.should.have.property('_selection')
        .that.equals('A1')

      vm.selection = 'C1'
      vm.should.have.property('_selection')
        .that.is.null
    })

    it('should be able to validate price of a valid selection with enough balance', () => {
      vm.selection = 'A1'
      vm.should.have.property('_selection')
        .that.equals('A1')

      vm.balance = 75
      expect(() => vm.validateBalance()).to.not.throw('not enough balance')
    })

    it('should throw an error if a valid selection if not enough balance', () => {
      vm.selection = 'A1'
      vm.should.have.property('_selection')
        .that.equals('A1')

      vm.clearBalance()
      expect(() => vm.validateBalance()).to.throw('not enough balance')
    })

    it('should be not throw error if stock is left', () => {
      vm.selection = 'A1'
      vm.balance = 75
      expect(() => vm.validateStock()).to.not.throw('no stock left')
    })

    it('should throw an error if no stock left', () => {
      vm.clearStock()
      vm.selection = 'A1'
      vm.balance = 75
      expect(() => vm.validateStock()).to.throw('no stock left')
    })
  })

  describe('track credits', () => {
    it.skip('', () => {
      expect(true).to.not.be.ok
    })
  })

  describe('validateBalance()', () => {
    let vm
    beforeEach(() => {
      vm = new VendingMachine()
      vm.restock()
    })

    it('should return true if balance is sufficient', () => {
      vm.addBalance(100)
      vm.balance.should.equal(100)
      vm.selection = 'A1' // price is 75
      expect(() => vm.validateBalance()).to.not.throw('not enough balance')
      const rv = vm.validateBalance()
      expect(rv).to.be.true
    })

    it('should throw error if balance is not sufficient', () => {
      vm.selection = 'A1'
      vm.addBalance(50)
      expect(() => vm.validateBalance()).to.throw('not enough balance')
    })
  })

  describe('dispensing treats', () => {
    let vm
    beforeEach(() => {
      vm = new VendingMachine()
      vm.restock()
    })

    it('should remove and return treat from the correct stock if selection is validated', () => {
      vm.stock['A1'].should.have.lengthOf(10)
      vm.selection = 'A1'
      vm.state = 'validated'
      const treat = vm.popTreat()
      treat.should.be.instanceOf(Treat)
      vm.stock['A1'].should.have.lengthOf(9)
      vm.stock['A2'].should.have.lengthOf(10)
      vm.state.should.equal('idle')
    })
  })

  describe('dispenseChange()', () => {
    let vm
    beforeEach(() => {
      vm = new VendingMachine()
      vm.restock()
    })

    it('if validated, should return remaining balance and set balance to 0', () => {
      vm.state = 'validated'
      vm.balance = 25
      const change = vm.dispenseChange()
      change.should.equal(25)
      vm.balance.should.equal(0)
      vm.state.should.equal('validated')
    })

    it('if not validated, should return remaining balance and set balance to 0', () => {
      vm.state.should.not.equal('validated')
      vm.balance = 25
      const change = vm.dispenseChange()
      change.should.equal(0)
      vm.balance.should.equal(25)
      vm.state.should.not.equal('validated')
    })
  })

  describe('popTreat()', () => {
    let vm

    beforeEach(() => {
      vm = new VendingMachine()
      vm.restock()
    })

    it('if selection validated, should return a treat', () => {
      vm.selection = 'A1'
      vm.state = 'validated'
      const treat = vm.popTreat()
      vm.stock.should.change
      treat.should.be.an('object')
      vm.state.should.equal('idle')
    })

    it('if not validated, should not return a treat', () => {
      vm.state.should.not.equal('validated')
      expect(() => vm.popTreat()).to.throw('selection not validated')
      vm.stock.should.not.change
    })
  })

  describe('validateSetSelection()', () => {
    let vm

    beforeEach(() => {
      vm = new VendingMachine()
      vm.restock()
    })

    it('if selection exists, sets selection and state to "selected"', () => {
      vm.state.should.not.equal('validated')
      vm.validateSetSelection('A1')
      vm.selection.should.equal('A1')
    })

    it('if selection does not exist, does not set selection, throws error', () => {
      vm.state.should.not.equal('validated')
      expect(() => vm.validateSetSelection('Z1')).to.throw('not a valid selection')
      expect(vm.selection).to.not.equal('Z1')
      expect(vm.selection).to.be.null
    })
  })

  describe('validateStock()', () => {
    let vm

    beforeEach(() => {
      vm = new VendingMachine()
    })

    it('if selection is in stock, return true and don\'t throw error', () => {
      vm.restock()
      vm.selection = 'A1'
      expect(() => vm.validateStock()).to.not.throw('no stock left')
      const rv =  vm.validateStock()
      expect(rv).to.equal(true)
    })

    it('if selection is not in stock, throws error', () => {
      vm.selection = 'A1'
      expect(() => vm.validateStock()).to.throw('no stock left')
    })
  })
})


