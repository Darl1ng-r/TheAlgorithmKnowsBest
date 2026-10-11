import type { VerdictTokenClaim } from '../types';

export class SecurityService {
  private static readonly CLIENT_SECRET = 'the-algorithm-knows-best-ephemeral-v1';
  private static readonly TTL_MS = 15 * 60 * 1000; // 15 minutes

  /**
   * Generates a signed verdict claim using Web Crypto API HMAC-SHA256
   */
  public static async issueVerdictClaim(assignmentId: string): Promise<VerdictTokenClaim> {
    const nonce = crypto.randomUUID();
    const issuedAt = Date.now();
    const expiresAt = issuedAt + this.TTL_MS;

    const payload = `${nonce}:${assignmentId}:${expiresAt}`;
    const token = await this.signPayload(payload);

    return {
      token: `${payload}:${token}`,
      nonce,
      assignmentId,
      issuedAt,
      expiresAt,
    };
  }

  /**
   * Cryptographically verifies a verdict claim token
   */
  public static async verifyVerdictClaim(
    fullToken: string,
    expectedAssignmentId: string
  ): Promise<{ valid: boolean; reason?: string }> {
    const parts = fullToken.split(':');
    if (parts.length !== 4) {
      return { valid: false, reason: 'Malformed token structure' };
    }

    const [nonce, assignmentId, expiresAtStr, receivedSig] = parts;
    const expiresAt = parseInt(expiresAtStr, 10);

    // 1. Time validity
    if (Date.now() > expiresAt) {
      return { valid: false, reason: 'Verdict claim token expired (15-minute window exceeded)' };
    }

    // 2. Assignment ID integrity
    if (assignmentId !== expectedAssignmentId) {
      return { valid: false, reason: 'Token assignment mismatch' };
    }

    // 3. Signature verification
    const payload = `${nonce}:${assignmentId}:${expiresAtStr}`;
    const expectedSig = await this.signPayload(payload);

    if (receivedSig !== expectedSig) {
      return { valid: false, reason: 'Cryptographic signature mismatch (tampered payload)' };
    }

    return { valid: true };
  }

  /**
   * Generates persistent anonymous client UUID
   */
  public static getOrCreateClientUUID(): string {
    const STORAGE_KEY = 'the_algorithm_client_uuid';
    let id = localStorage.getItem(STORAGE_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(STORAGE_KEY, id);
    }
    return id;
  }

  /**
   * Sub-routine for HMAC-SHA256 signing via Web Crypto
   */
  private static async signPayload(message: string): Promise<string> {
    const enc = new TextEncoder();
    const keyData = enc.encode(this.CLIENT_SECRET);
    const msgData = enc.encode(message);

    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signature = await crypto.subtle.sign('HMAC', cryptoKey, msgData);
    const hashArray = Array.from(new Uint8Array(signature));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
}
