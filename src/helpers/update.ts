import util from 'util';
import {execSync} from 'child_process';

export async function update() {
  return execSync('curl -L -O https://github.com/Mario-35/trace/raw/refs/heads/main/dist.zip && unzip -qq -o dist.zip -d ./trace/').toString();
}