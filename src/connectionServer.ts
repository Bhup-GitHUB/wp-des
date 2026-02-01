import { routeMessage } from './messageRouter';

export function serverReceive(
    ciphertext: string,
    senderId: string,
    recipientId: string
): void {
    console.log('[Connection Server] Received encrypted message');
    console.log('[Connection Server] Ciphertext:', ciphertext);
    console.log('[Connection Server] From:', senderId);
    console.log('[Connection Server] To:', recipientId);
    console.log('[Connection Server] Status: Never decrypted, forwarding...\n');

    routeMessage(ciphertext, senderId, recipientId);
}
