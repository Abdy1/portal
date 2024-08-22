import { NumberShortenPipe } from './number-shorten.pipe';

describe('NumberShortenPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberShortenPipe();
    expect(pipe).toBeTruthy();
  });
});
