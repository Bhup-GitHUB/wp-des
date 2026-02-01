import { Client } from './client';
import { Receiver } from './receiver';
import { registerReceiver, setUserOnline } from './messageRouter';

console.log('='.repeat(60));
console.log('WhatsApp E2E Encryption Demo - Phase 3');
console.log('Receiver Decrypts (End-to-End)');
console.log('='.repeat(60));
console.log();

const alice = new Client('Alice', 'alice-private-key-xyz');
const bobReceiver = new Receiver('Bob', 'alice-private-key-xyz');

registerReceiver('Bob', (ciphertext: string, senderId: string) => {
    bobReceiver.receiveMessage(ciphertext, senderId);
});

console.log('Scenario 1: Bob is offline, Alice sends a message\n');
console.log('-'.repeat(60));
console.log();

alice.sendMessage('Hey Bob, are you there?', 'Bob');

console.log('='.repeat(60));
console.log();

console.log('Scenario 2: Bob comes online and decrypts queued messages\n');
console.log('-'.repeat(60));
console.log();

setUserOnline('Bob');

console.log('='.repeat(60));
console.log();

console.log('Scenario 3: Bob is online, receives and decrypts immediately\n');
console.log('-'.repeat(60));
console.log();

alice.sendMessage('Great! You are back online.', 'Bob');

console.log('='.repeat(60));
console.log('Key Takeaways:');
console.log('='.repeat(60));
console.log('1. Decryption happens ONLY on receiver device');
console.log('2. Server never has access to private keys');
console.log('3. Server cannot decrypt even if compromised');
console.log('4. This is true End-to-End Encryption');
console.log('5. Complete flow: Encrypt → Route → Queue → Deliver → Decrypt');
console.log('='.repeat(60));

