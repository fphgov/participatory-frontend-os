declare module "random-id" {
  function randomId(len: number, pattern: string): string;
  namespace randomId { } // This is a hack to allow ES6 wildcard imports
  export = randomId;
}

declare module "@icetee/time-ago" {
  class TimeAgo {
    constructor(translations?: Record<string, string>)

    ago(date: string|Date) : string
    today() : string
  }

  namespace TimeAgo { } // This is a hack to allow ES6 wildcard imports

  export = TimeAgo;
}
