/* eslint @typescript-eslint/unbound-method: "off" */

import * as basis from "./basis";
import * as schema from "./schema";

const { include } = basis;

export class DDlogDat implements basis.Render {
  constructor() {
    return this;
  }

  public render(): schema.Grammar {
    return {
      name: "DDlog Command Script",
      scopeName: "source.ddlog.dat",
      fileTypes: [".dat"],
      patterns: [include(this.PARSE)],
      repository: {
        PARSE: this.PARSE(),
      },
    };
  }

  PARSE(): schema.Rule {
    return {
      patterns: [],
    };
  }
}

export default new DDlogDat().render();
