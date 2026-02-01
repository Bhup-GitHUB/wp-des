function decrypt(ciphertext: string, key: string): string {
    const decoded = Buffer.from(ciphertext, 'base64').toString();
    return decoded.replace(key, '');
}

export class Receiver {
    private privateKey: string;
    private username: string;

    constructor(username: string, privateKey: string) {
        this.username = username;
        this.privateKey = privateKey;
    }

    receiveMessage(ciphertext: string, senderId: string): void {
        console.log(`[${this.username}] Received encrypted message from ${senderId}`);
        console.log(`[${this.username}] Ciphertext: ${ciphertext}`);

        const plaintext = decrypt(ciphertext, this.privateKey);

        console.log(`[${this.username}] Decrypted message: "${plaintext}"`);
        console.log(`[${this.username}] Decryption happened on device only\n`);
    }

    getUsername(): string {
        return this.username;
    }

    getPrivateKey(): string {
        return this.privateKey;
    }
}
