const yargs = require('yargs');

function runCli() {
  new yargs()
    .help().parse(['--help']);
}
describe('test yargs', () => {
  it('shows help', () => {
    runCli();
  })
});
