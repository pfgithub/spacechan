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

client.on("channelUpdate", async(oldChan, channel) => {
	if(channel.name.indexOf("-") === -1) {return;}
	
	let guild = channel.guild;
	let myPerms = channel.memberPermissions(guild.me);
	
	if(!myPerms.has("MANAGE_CHANNELS")) {
		if(myPerms.has("VIEW_CHANNEL") && myPerms.has("SEND_MESSAGES")) {
			if(guild.me.hasPermission("MANAGE_CHANNELS")) {
				let msg = await channel.send(language.cannotManageThisChannel(channel));
				return await msg.delete(30*1000);
			}
			let msg = await channel.send(language.cannotManageAnyChannels(channel));
			return await msg.delete(30*1000);
		}
		// Do nothing
		return;
	}
	
	channel.setName(channel.name.split`-`.join`\xa0`, language.success);
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
});

function updateActivity() {
	let count = client.guilds.size;
	client.user.setActivity(language.status(count));
}

client.login(secret.token);