const fs = require("fs");

module.exports = {
	botName: "SpaceChan",
	botWebsite: "https://pfgithub.github.io/spacechan/",
	aboutMessage: fs.readFileSync("./about.discord.md", "utf8"),
	aboutMessageHeader: "About: ",
	unknownCommand: "Say `about` for info about me.",
	status: count => `spacing ${count} servers. pm \`about\` for help`,
	cannotManageThisChannel: channel => `<:failure:508841130503438356> I could not put spaces in ${channel} because that channel does not allow me to manage channel. To fix this, edit the channel settings and allow me to manage this channel.`,
	cannotManageAnyChannels: channel => `<:failure:508841130503438356> I could not put spaces in ${channel} because I do not have permission to manage any channels on this server.`,
	success: "PM me `about` for help and usage.",
	spacingChannels: _ => "Spacing all channels in this server..."
};