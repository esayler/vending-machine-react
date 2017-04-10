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

  describe('validate credits is sufficient for selection', () => {
    it.skip('', () => {
      expect(true).to.not.be.ok
    })
  })

  describe('dispensing treats', () => {
    let vm
    beforeEach(() => {
      vm = new VendingMachine()
      vm.restock()
    })

    it('should remove and return treat from the correct stock', () => {
      vm.stock['A1'].should.have.lengthOf(10)
      vm.selection = 'A1'
      const treat = vm.popTreat()
      treat.should.be.instanceOf(Treat)
      vm.stock['A1'].should.have.lengthOf(9)
      vm.stock['A2'].should.have.lengthOf(10)
    })
  })
})


// TODO: test state
