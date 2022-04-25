/* eslint-disable  */
const Sequencer = require('@jest/test-sequencer').default;

class CustomSequencer extends Sequencer {
  sort(tests) {
    let test = Array.from(tests).sort((A, B) => (A.path > B.path ? 1 : -1));
    //console.log(test)
    return test;
  }
}

module.exports = CustomSequencer;