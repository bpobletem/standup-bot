import { TextChannel } from 'discord.js';

export async function createThread(channel: TextChannel, threadName: string) {
    try {
        const thread = await channel.threads.create({
            name: threadName,
            autoArchiveDuration: 60,
            reason: 'Needed a separate thread for discussion',
        });
        console.log(`Created thread: ${thread.name}`);
        return thread;
    } catch (error) {
        console.error('Error creating thread:', error);
    }
}