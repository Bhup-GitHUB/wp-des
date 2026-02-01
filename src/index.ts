import { Client } from './client';
import { getMessagesForUser } from './messageRouter';

console.log('='.repeat(60));
console.log('WhatsApp E2E Encryption Demo - Phase 1');
console.log('Connection & Message Send (Client → Erlang-like Server)');
console.log('='.repeat(60));
console.log();

const alice = new Client('Alice', 'alice-private-key-xyz');
const bob = new Client('Bob', 'bob-private-key-abc');

console.log('Scenario: Alice sends a message to Bob\n');
console.log('-'.repeat(60));
console.log();

alice.sendMessage('Hello Bob! How are you?', 'Bob');

console.log('='.repeat(60));
console.log('Key Takeaways:');
console.log('='.repeat(60));
console.log('1. Client encrypts message before sending');
console.log('2. Server only sees ciphertext (never decrypts)');
console.log('3. Message stays encrypted in the queue');
console.log('4. Simulates persistent TCP connection pattern');
console.log('='.repeat(60));
console.log();

const bobMessages = getMessagesForUser('Bob');
console.log(`Bob has ${bobMessages.length} encrypted message(s) in queue`);
if (bobMessages.length > 0) {
    console.log('Message details:', JSON.stringify(bobMessages[0], null, 2));
}
