import common from './common';
import local from './local';
import dev from './dev';
import prod from './prod';

import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';

const phase = process.env.NODE_ENV; // phase에 NODE_ENV 값 저장

let conf = {}; // phase의 값에 따라서 적절한 환경변수 값을 conf에 저장
if (phase === 'local') {
  conf = local;
} else if (phase === 'dev') {
  conf = dev;
} else if (phase === 'prod') {
  conf = prod;
}

// yaml설정 추가
const yamlConfig: Record<string, any> = yaml.load(
  readFileSync(`${process.cwd()}/envs/config.yaml`, 'utf-8'),
) as Record<string, any>;

// common과 conf에서 받은 값을 합쳐서 결과값으로 주는 함수 반환
export default () => ({
  ...common,
  ...conf,
  ...yamlConfig,
});
