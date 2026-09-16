// TODO: delete when dom.lib.d.ts is updated

interface TrustedHTML {
  toString(): string;
}

interface TrustedTypePolicyOptions {
  createHTML?: (input: string) => string;
}

interface TrustedTypePolicy {
  createHTML(input: string): TrustedHTML;
}

interface TrustedTypePolicyFactory {
  createPolicy(name: string, rules: TrustedTypePolicyOptions): TrustedTypePolicy;
}

interface Window {
  trustedTypes?: TrustedTypePolicyFactory;
}
