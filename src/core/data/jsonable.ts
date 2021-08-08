export class JSONable {
  // eslint-disable-next-line @typescript-eslint/ban-types
  public toJSON(): object {
    const result: { [key: string]: unknown } = {};
    const entries = Object.entries(this);
    for (const [key, value] of entries) {
      if (typeof value === 'function') {
        continue;
      }
      result[key] = value?.toJSON?.() || value;
    }
    return result;
  }
}
