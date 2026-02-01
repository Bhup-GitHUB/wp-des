interface EncryptedMessage {
    ciphertext: string;
    from: string;
    to: string;
    timestamp: number;
}

const messageQueue: Map<string, EncryptedMessage[]> = new Map();

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

    if (!messageQueue.has(recipientId)) {
        messageQueue.set(recipientId, []);
    }

    messageQueue.get(recipientId)!.push(message);

    console.log('[Message Router] Message routed successfully');
    console.log('[Message Router] Queued for:', recipientId);
    console.log('[Message Router] Queue size:', messageQueue.get(recipientId)!.length);
    console.log('[Message Router] Message remains encrypted in queue\n');
}

export function getMessagesForUser(userId: string): EncryptedMessage[] {
    return messageQueue.get(userId) || [];
}

export function clearMessagesForUser(userId: string): void {
    messageQueue.delete(userId);
}
