export class JSONable {
  public toJSON(): object {
    const result: { [key: string]: any } = {};
    const entries = Object.entries(this);
    for (const [key, value] of entries) {
      if (typeof value === 'function') {
        continue;
      }
      if (value.toJSON) {
        result[key] = value.toJSON();
      } else {
      }
      result[key] = value.toJSON?.() || value;
    }
    return result;
  }
}