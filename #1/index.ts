var _ = require('lodash');

export default class<TInput extends Array<any> = Array<any>, TOutput = any> {
  cache: Function;
  delay?: number;

  constructor(private handler: (...args: TInput) => Promise<TOutput>, private timeout?: number) {
    this.cache = _.memoize(this.handler);
    this.delay = this.timeout;
  }

  
  async exec(...args: TInput): Promise<TOutput> {
    let output;

    if(this.delay){
      this.cache = _.memoize(this.handler);
      output = this.cache(...args);
    }
    else{
      output = this.cache(...args);
    }
    return output as TOutput;
  }

}

/**
 * Storing a result to a cache using memoization 
 * */ 
