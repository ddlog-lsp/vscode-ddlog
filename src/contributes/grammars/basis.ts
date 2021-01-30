import * as schema from "./schema";

export const Class = {
  alnum: "[:alnum:]",
  alpha: "[:alpha:]",
  ascii: "[:ascii:]",
  blank: "[:blank:]",
  cntrl: "[:cntrl:]",
  digit: "[:digit:]",
  graph: "[:graph:]",
  lower: "[:lower:]",
  print: "[:print:]",
  punct: "[:punct:]",
  space: "[:space:]",
  upper: "[:upper:]",
  word: "[:word:]",
  xdigit: "[:xdigit:]",
};

const id = "[0-9A-Za-z!#$%&'*+-./:<=>?@\\^_'|~]+";

export function ref<T extends unknown[]>(f: (...args: T) => schema.Rule): string {
  return `#${f.name}`;
}

export function include<T extends unknown[]>(f: (...args: T) => schema.Rule): { include: string } {
  return { include: ref(f) };
}

export const alt = (...rest: string[]): string => rest.join("|");

export const capture = (arg: string): string => `(${arg})`;

export const complement = (...rest: string[]): string => `[^${rest.join("")}]`;

export const group = (arg: string): string => `(?:${arg})`;

export const lookAhead = (arg: string): string => `(?=${arg})`;

export const lookBehind = (arg: string): string => `(?<=${arg})`;

export const many = (arg: string): string => `${arg}*`;

export const manyOne = (arg: string): string => `${arg}+`;

export const negativeLookAhead = (arg: string): string => `(?!${arg})`;

export const negativeLookBehind = (arg: string): string => `(?<!${arg})`;

export const opt = (arg: string): string => `(?:${arg})?`;

export const seq = (...rest: string[]): string => rest.join("");

export const set = (...rest: string[]): string => `[${rest.join("")}]`;

export const words = (arg: string): string => `\\b${arg}\\b`;

export const ops = (arg: string): string => {
  const operatorTokens: string[] = ["\\."];
  return seq(negativeLookBehind(set(...operatorTokens)), arg, negativeLookAhead(set(...operatorTokens)));
};

export const lastOps = (...rest: string[]): string => {
  const operatorTokens: string[] = ["\\."];
  const result: string[] = [];
  for (const token of rest) {
    result.push(`[^${seq(...operatorTokens)}]${token}`, `^${token}`);
  }
  return group(seq(lookBehind(group(alt(...result))), negativeLookAhead(set(...operatorTokens))));
};

export const lastWords = (...rest: string[]): string => {
  const result: string[] = [];
  for (const token of rest) result.push(`[^${id}]${token}`, `^${token}`);
  return group(seq(lookBehind(group(alt(...result))), negativeLookAhead(`${id}`)));
};

export const Token = {};

export class Scope {}

export interface Render {
  render(): schema.Grammar;
}
