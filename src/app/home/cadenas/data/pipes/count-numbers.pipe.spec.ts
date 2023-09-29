import { CountNumbersPipe } from './count-numbers.pipe';

describe('CountNumbersPipe', () => {
  it('create an instance', () => {
    const pipe = new CountNumbersPipe();
    expect(pipe).toBeTruthy();
  });
});
