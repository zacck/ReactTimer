//libraries we need to do testing
var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require ('react-addons-test-utils');
var $ = require('jQuery');

//module to test
var CountDown = require('CountDown');


//describe block with assertions
describe('CountDown', () =>{
  it('Should Exist', ()=>{
    expect(CountDown).toExist();
  });

  describe('handleSetCountdown', ()=>{
    /*use the done argument to do async tests*/
    it('should set the state to started and CountDown', (done) => {
      var countdown = TestUtils.renderIntoDocument(<CountDown/>);
      countdown.handleSetCountdown(10);

      expect(countdown.state.count).toBe(10);
      expect(countdown.state.countdownStatus).toBe('started');

      setTimeout(() => {
        expect(countdown.state.count).toBe(9);
        done();
      },1001);
    });
  });

  describe('checkNegative seconds ', ()=> {
    /*use the done argument to do async tests*/
    it('it should not set the seconds to a negative value', (done) => {
      var countdown = TestUtils.renderIntoDocument(<CountDown/>);
      countdown.handleSetCountdown(1);

      setTimeout(() => {
        expect(countdown.state.count).toBe(0);
        done();
      },3001);
    });
  });
  it('should pause countdown on paused status', () =>{
    var countdown = TestUtils.renderIntoDocument(<CountDown/>);
    countdown.handleSetCountdown(3);
    countdown.handleStatusChanged('paused');

    setTimeout(() =>{
      expect(countdown.state.count).toBe(3);
      expect(countdown.state.countdownStatus).toBe('paused');
    },1001);
  });

  it('should stop and set count to 0', () =>{
    var countdown = TestUtils.renderIntoDocument(<CountDown/>);
    countdown.handleSetCountdown(3);
    countdown.handleStatusChanged('stopped');

    setTimeout(() =>{
      expect(countdown.state.count).toBe(0);
      expect(countdown.state.countdownStatus).toBe('stopped');
    },1001);
  });
});
