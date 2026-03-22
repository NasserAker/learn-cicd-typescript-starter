// src/tests/auth.test.ts
import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth.js";

describe("getAPIKey", () => {
  test("returns null when no authorization header", () => {
    expect(getAPIKey({})).toBeNull();
  });

  test("returns null when authorization header is empty", () => {
    expect(getAPIKey({ authorization: "" })).toBeNull();
  });

  test("returns null when scheme is not ApiKey", () => {
    expect(getAPIKey({ authorization: "Bearer sometoken123" })).toBeNull();
  });

  test("returns null when header has no token after ApiKey", () => {
    expect(getAPIKey({ authorization: "ApiKey" })).toBeNull();
  });

  test("returns the API key when header is valid", () => {
    expect(getAPIKey({ authorization: "ApiKey mySecretKey123" })).toBe(
      "mySecretKey123",
    );
  });

  test("returns the correct key with a different valid token", () => {
    expect(getAPIKey({ authorization: "ApiKey abc-def-ghi" })).toBe(
      "abc-def-ghi",
    );
  });
});
