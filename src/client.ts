import { serverReceive } from './connectionServer';

function encrypt(message: string, key: string): string {
    return Buffer.from(message + key).toString('base64');
}

export class Client {
    private privateKey: string;
    private username: string;

    constructor(username: string, privateKey: string) {
        this.username = username;
        this.privateKey = privateKey;
    }

    sendMessage(plainText: string, recipientId: string): void {
        const ciphertext = encrypt(plainText, this.privateKey);

        console.log(`[${this.username}] Sending message to ${recipientId}`);
        console.log(`[${this.username}] Plaintext: "${plainText}"`);
        console.log(`[${this.username}] Encrypted: ${ciphertext}\n`);

        serverReceive(ciphertext, this.username, recipientId);
    }

    getUsername(): string {
        return this.username;
    }
}
