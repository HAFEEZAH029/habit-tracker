import { describe, it, expect, beforeEach } from "vitest";
import {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
} from "../../src/lib/storage";

describe('storage utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns fallback when key does not exist', () => {
    const result = getStorageItem("missing-key", []);

    expect(result).toEqual([]);
  });

  it('stores and retrieves a value correctly', () => {
    const data = { name: "test" };

    setStorageItem("test-key", data);
    const result = getStorageItem("test-key", null);

    expect(result).toEqual(data);
  });

  it('removes a value from localStorage', () => {
    setStorageItem("test-key", { value: 123 });

    removeStorageItem("test-key");
    const result = getStorageItem("test-key", null);

    expect(result).toBeNull();
  });

  it('returns fallback when stored JSON is invalid', () => {
    localStorage.setItem("bad-json", "{invalid}");

    const result = getStorageItem("bad-json", "fallback");

    expect(result).toBe("fallback");
  });
});