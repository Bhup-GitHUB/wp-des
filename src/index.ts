import { Client } from './client';
import { getMessagesForUser, setUserOnline, setUserOffline } from './messageRouter';

console.log('='.repeat(60));
console.log('WhatsApp E2E Encryption Demo - Phase 2');
console.log('Message Routing & Queue (Server is Blind)');
console.log('='.repeat(60));
console.log();

const alice = new Client('Alice', 'alice-private-key-xyz');
const bob = new Client('Bob', 'bob-private-key-abc');

console.log('Scenario 1: Bob is offline, Alice sends a message\n');
console.log('-'.repeat(60));
console.log();

alice.sendMessage('Hey Bob, are you there?', 'Bob');

const queuedMessages = getMessagesForUser('Bob');
console.log(`Bob has ${queuedMessages.length} queued message(s)\n`);

console.log('='.repeat(60));
console.log();

console.log('Scenario 2: Bob comes online, receives queued messages\n');
console.log('-'.repeat(60));
console.log();

setUserOnline('Bob');

console.log('='.repeat(60));
console.log();

console.log('Scenario 3: Bob is online, Alice sends another message\n');
console.log('-'.repeat(60));
console.log();

alice.sendMessage('Great! You are back online.', 'Bob');

console.log('='.repeat(60));
console.log('Key Takeaways:');
console.log('='.repeat(60));
console.log('1. Server routes messages based on online status');
console.log('2. Offline messages are queued (still encrypted)');
console.log('3. Messages delivered when receiver comes online');
console.log('4. Server remains blind to content in all cases');
console.log('5. Client-server architecture (not P2P)');
console.log('='.repeat(60));
