import chai from 'chai'
import Treat from '../src/helpers/Treat'

var expect = chai.expect
chai.should()

describe('Treat', () => {
  describe('initial state', () => {
    let treat

    beforeEach(() => {
      treat = new Treat()
    })

    it('should have an name', () => {
      treat.should.have.property('_name')
        .that.is.a('string')
        .that.equals('')
    })

    it('should have a price of 75 credits', () => {
      treat.should.have.property('_price')
        .that.is.a('number')
        .that.equals(75)
    })
  })
})
