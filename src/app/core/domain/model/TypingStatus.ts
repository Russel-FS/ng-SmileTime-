export interface TypingStatus {
    senderId: string | number,
    receiverId: string | number,
    isTyping: boolean,
    conversationId: number
}
