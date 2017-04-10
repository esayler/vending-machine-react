import chai from 'chai'
import VendingMachine from '../src/helpers/VendingMachine'
import Treat from '../src/helpers/Treat'

var expect = chai.expect
chai.should()

describe('Integration', () => {
  let vm
  let person

  beforeEach(() => {
    vm = new VendingMachine()
    vm.restock()
  })

  it('A person inserts 100 credits and selects a treat that costs 75 credits', () => {
    vm.state.should.equal('idle')
    vm.balance.should.equal(0)
    vm.addBalance(100)
    vm.state.should.equal('credited')
    vm.selection = 'A1'
    vm.selection.should.equal('A1')
    vm.state.should.equal('selected')
    expect(() => vm.validateBalance()).to.not.throw('not enough balance')
    expect(() => vm.validateStock()).to.not.throw('no stock left')
    vm.validateSelection()
    vm.state.should.equal('validated')
    vm.adjustBalance()
    vm.balance.should.equal(25)
    const change = vm.dispenseChange()
    change.should.equal(25)
    vm.state.should.equal('validated')
    const treat = vm.popTreat()
    treat.should.be.an('object')
    vm.balance.should.equal(0)
    vm.state.should.equal('idle')
  })

  it('A person inserts 50 credits ($0.50) and selects a treat that costs 75 credits', () => {
    vm.state.should.equal('idle')
    vm.balance.should.equal(0)
    vm.addBalance(50)
    vm.state.should.equal('credited')
    vm.selection = 'A1'
    vm.selection.should.equal('A1')
    vm.state.should.equal('selected')
    expect(() => vm.validateBalance()).to.throw('not enough balance')
    expect(() => vm.validateStock()).to.not.throw('no stock left')
    vm.validateSelection()
    vm.state.should.not.equal('validated')
    vm.state.should.equal('credited')
    vm.adjustBalance()
    vm.balance.should.equal(50)
    const change = vm.dispenseChange()
    change.should.equal(0)
    vm.balance.should.equal(50)
    vm.state.should.equal('credited')
    expect(() => vm.popTreat()).to.throw('selection not validated')
    vm.balance.should.equal(50)
    vm.state.should.equal('credited')
  })
})
