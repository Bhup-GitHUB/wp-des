interface EncryptedMessage {
    ciphertext: string;
    from: string;
    to: string;
    timestamp: number;
}

const messageQueue: Map<string, EncryptedMessage[]> = new Map();
const onlineUsers: Set<string> = new Set();

export function setUserOnline(userId: string): void {
    onlineUsers.add(userId);
    console.log(`[Message Router] ${userId} is now online`);
    deliverQueuedMessages(userId);
}

export function setUserOffline(userId: string): void {
    onlineUsers.delete(userId);
    console.log(`[Message Router] ${userId} is now offline\n`);
}

export function isUserOnline(userId: string): boolean {
    return onlineUsers.has(userId);
}

function deliverQueuedMessages(userId: string): void {
    const messages = messageQueue.get(userId);
    if (messages && messages.length > 0) {
        console.log(`[Message Router] Delivering ${messages.length} queued message(s) to ${userId}`);
        messages.forEach(msg => {
            deliver(msg.ciphertext, userId);
        });
        messageQueue.delete(userId);
    }
    console.log();
}

function deliver(ciphertext: string, recipientId: string): void {
    console.log(`[Message Router] Delivering to ${recipientId}`);
    console.log(`[Message Router] Ciphertext: ${ciphertext}`);
    console.log(`[Message Router] Server still blind to content\n`);
}

export function routeMessage(
    ciphertext: string,
    senderId: string,
    recipientId: string
): void {
    const message: EncryptedMessage = {
        ciphertext,
        from: senderId,
        to: recipientId,
        timestamp: Date.now()
    };

    if (isUserOnline(recipientId)) {
        console.log('[Message Router] Receiver is online, delivering immediately');
        deliver(ciphertext, recipientId);
    } else {
        console.log('[Message Router] Receiver is offline, queueing message');

        if (!messageQueue.has(recipientId)) {
            messageQueue.set(recipientId, []);
        }

        messageQueue.get(recipientId)!.push(message);
        console.log('[Message Router] Queue size:', messageQueue.get(recipientId)!.length);
        console.log('[Message Router] Message remains encrypted in queue\n');
    }
}

export function getMessagesForUser(userId: string): EncryptedMessage[] {
    return messageQueue.get(userId) || [];
}

export function clearMessagesForUser(userId: string): void {
    messageQueue.delete(userId);
}

