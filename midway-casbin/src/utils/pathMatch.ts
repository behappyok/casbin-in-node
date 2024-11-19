/*
 * @Description  :
 * @Author       : zyl
 * @Date         : 2023-06-28 13:01:08
 * @LastEditTime : 2023-06-28 13:01:08
 * @FilePath     : \\midway-project\\src\\utils\\pathMatch.ts
 */
/*
 * @Description  :
 * @Author       : zyl
 * @Date         : 2023-03-29 10:14:20
 * @LastEditTime : 2023-03-29 17:54:37
 * @FilePath     : \\server\\src\\utils\\pathMatch.ts
 */
import { pathToRegexp } from 'path-to-regexp';
export function pathMatch(
  path: string,
  pattern: string | RegExp | (string | RegExp)[]
): boolean {
  if (typeof pattern === 'string') {
    const reg = pathToRegexp(pattern, [], { end: false });
    if (reg.global) {
      reg.lastIndex = 0;
    }
    return reg.test(path);
  } else if (pattern instanceof RegExp) {
    if (pattern.global) {
      pattern.lastIndex = 0;
    }
    return pattern.test(path);
  } else if (Array.isArray(pattern)) {
    return pattern.some(item => pathMatch(path, item));
  } else {
    return false;
  }
}

export function getParamsFromPattern(path: string, pattern) {
  const keys = [];
  const reg = pathToRegexp(pattern, keys, { end: false });
  if (reg.global) {
    reg.lastIndex = 0;
  }
  const match = reg.exec(path);
  const params = {};
  if (!match) {
    return params;
  }
  for (let i = 1; i < match.length; i++) {
    params[keys[i - 1].name] = match[i];
  }
  return params;
}
