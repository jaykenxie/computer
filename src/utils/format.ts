export function fomatDigit(dig: string, ctn: string[] = []): string[] {
  const len = dig.length;
  if (len <= 3) {
    ctn.push(dig);
    return ctn;
  }
  ctn.push(dig.substring(len - 3));
  const start = dig.substring(0, len - 3);
  return fomatDigit(start, ctn);
}
