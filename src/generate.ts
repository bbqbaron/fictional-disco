import { writeFileSync } from 'fs';
import { forEach, toPairs } from 'ramda';
import { writeActions } from './actions';
import writeEffects from  './effects'
import writeReducer from './reducer';

const actions = [
  { name: 'foo', effectful: false, selected: false },
  { name: 'bar', effectful: true, selected: false }
]

const files = {
  actions: writeActions(actions),
  effects: writeEffects(actions),
  reducer: writeReducer(actions),
}

try {
  forEach(
    ([filename, contents]) => writeFileSync(`${process.cwd()}/out/${filename}.js`, contents),
    toPairs(files)
  );
} catch (e) {
  console.error(e.stack);
}
