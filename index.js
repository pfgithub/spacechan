const Discord = require("discord.js");
const RichEmbed = Discord.RichEmbed;

const secret = require("./secret");

const client = new Discord.Client();

const language = require("./language");

client.on("ready", () => {
	console.log(`Started as ${client.user.tag}`); //eslint-disable-line no-console
	setInterval(updateActivity, 60 * 1000);
	updateActivity();
});

async function send(language, mainArgs, backupArgs, main, backup) {
	let myPerms = main.memberPermissions(main.guild.me);
	if(myPerms.has("VIEW_CHANNEL") && myPerms.has("SEND_MESSAGES")) {
		let msg = await main.send(language(mainArgs));
		return await msg.delete(30*1000);
	}else if(backup) {
		return await backup.send(language(backupArgs));
	}
	// Send nowhere
}

async function spaceChannel(channel, errorLocation, backupErrorLocation) {
	if(channel.name.indexOf("-") === -1) {return;}
	
	let guild = channel.guild;
	let myPerms = channel.memberPermissions(guild.me);
	
	if(!myPerms.has("MANAGE_CHANNELS")) {
		if(guild.me.hasPermission("MANAGE_CHANNELS")) {
			return await send(language.cannotManageThisChannel, channel.toString(), `#${channel.name}`, errorLocation, backupErrorLocation);
		}
		return await send(language.cannotManageAnyChannels, channel.toString(), `#${channel.name}`, errorLocation, backupErrorLocation);
	}
	
	channel.setName(channel.name.split`-`.join`\xa0`, language.success);
	return;
}

client.on("channelUpdate", async(oldChan, channel) => {
	if(channel.name.indexOf("-") === -1) {return;}
	
	await spaceChannel(channel, channel, undefined);
});

client.on("message", async msg => {
	if(msg.author.bot) {return;}

	let content = msg.content;

	if(!msg.guild) {
		if(content.indexOf("about") > -1) {
			return await msg.channel.send(language.aboutMessageHeader, {embed: {title: language.botName, description: language.aboutMessage, url: language.botWebsite, color: 14207324}});
		}
		return await msg.channel.send(language.unknownCommand); // Reply required because it contains the user ID.
	}
	
	if(msg.member.hasPermission("MANAGE_CHANNELS") && content.indexOf(client.user.id) > -1) {
		send(language.spacingChannels, undefined, undefined, msg.channel, msg.author);
		msg.guild.channels.forEach(channel => {
			spaceChannel(channel, msg.channel, msg.author);
		});
		return;
	}
});

function updateActivity() {
	let count = client.guilds.size;
	client.user.setActivity(language.status(count));
}

client.login(secret.token);
