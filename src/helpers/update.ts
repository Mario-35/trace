import util from 'util';
const exec = util.promisify(require('child_process').exec);

export async function update() {
  exec('./trace.sh');
  process.exit(112);
}