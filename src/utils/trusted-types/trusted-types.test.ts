import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("trusted-types", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  describe("createTrustedHTMLPolicy", () => {
    it("returns a fallback policy that sanitizes HTML when trustedTypes is unavailable", async () => {
      const { createTrustedHTMLPolicy } = await import("./index");
      const policy = createTrustedHTMLPolicy();

      const sanitized = policy.createHTML('<p>safe</p><script>alert("xss")</script>');

      expect(String(sanitized)).toContain("<p>safe</p>");
      expect(String(sanitized)).not.toContain("<script>");
    });

    it("creates a Trusted Types policy when trustedTypes is available", async () => {
      const createPolicy = vi.fn((_name: string, rules: { createHTML: (input: string) => string }) => ({
        createHTML: (input: string) => rules.createHTML(input),
      }));

      vi.stubGlobal("trustedTypes", { createPolicy });

      const { TRUSTED_TYPES_POLICY_NAME, createTrustedHTMLPolicy } = await import("./index");
      const policy = createTrustedHTMLPolicy();

      expect(createPolicy).toHaveBeenCalledWith(
        TRUSTED_TYPES_POLICY_NAME,
        expect.objectContaining({ createHTML: expect.any(Function) }),
      );

      const sanitized = policy.createHTML('<p>safe</p><script>alert("xss")</script>');

      expect(String(sanitized)).toContain("<p>safe</p>");
      expect(String(sanitized)).not.toContain("<script>");
    });
  });

  describe("getTrustedHTMLPolicy", () => {
    beforeEach(() => {
      vi.resetModules();
    });

    it("returns the same cached policy instance on subsequent calls", async () => {
      const { getTrustedHTMLPolicy } = await import("./index");

      const first = getTrustedHTMLPolicy();
      const second = getTrustedHTMLPolicy();

      expect(first).toBe(second);
    });

    it("only creates a Trusted Types policy once when trustedTypes is available", async () => {
      const createPolicy = vi.fn((_name: string, rules: { createHTML: (input: string) => string }) => ({
        createHTML: (input: string) => rules.createHTML(input),
      }));

      vi.stubGlobal("trustedTypes", { createPolicy });

      const { getTrustedHTMLPolicy } = await import("./index");

      getTrustedHTMLPolicy();
      getTrustedHTMLPolicy();

      expect(createPolicy).toHaveBeenCalledTimes(1);
    });
  });
});
