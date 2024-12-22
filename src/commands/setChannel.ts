import { CommandInteraction, SlashCommandBuilder, ChannelType, TextChannel } from 'discord.js';
import cron from 'node-cron';
import { config } from '../config';
import { createThread } from '../utils/createThread';

export const data = new SlashCommandBuilder()
    .setName('setchannel')
    .setDescription('Sets the channel for daily messages')
    .addChannelOption(option =>
        option.setName('channel')
            .setDescription('The channel to send daily messages')
            .setRequired(true)
    );

export async function execute(interaction: CommandInteraction) {
    const channel = interaction.options.get('channel')?.channel;
    if (!channel || channel.type !== ChannelType.GuildText) {
        return interaction.reply('Please select a valid text channel.');
    }

    config.MESSAGE_CHANNEL_ID = channel.id;

    await (channel as TextChannel).send('This channel has been set for daily messages.');

    const recurringCron = '5 22 * * *';
    cron.schedule(recurringCron, async () => {
        await (channel as TextChannel).send('Good evening! This is your daily message.');
    });

    console.log("Daily thread creation job scheduled.");

    return interaction.reply(`Daily messages will be sent to ${channel.name}`);
}