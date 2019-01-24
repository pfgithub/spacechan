Invite Me · [Support Server](https://discord.gg/j7qpZdE) · [Source Code](https://github.com/pfgithub/spacechan) · [Website](https://pfgithub.github.io/spacechan)

# SpaceChan
A discord bot for spacing #channel-names

## usage
Edit a channel name and SpaceChan will automatically replace the dashes with spaces.

Ping @SpaceChan to convert all dashes to spaces in all channels.

## disabling
To disable for a specific channel, edit that channel's settings and make it so SpaceChan does not have permission to Manage or Send Messages in that channel. [Screenshot](https://i.imgur.com/QTaqd77.png)

## errors
SpaceChan should send a descriptive error message to the channel you tried to edit if it can't add spaces.

If SpaceChan does not work at all, try using it on a channel where it has permission to read and send messages. That should give a descriptive error message of what went wrong.

If you have any issues, join the support server or submit an issue on github (linked below)

## links
[Invite Me] Spacechan is not currently being hosted.  
[Support Server](https://discord.gg/j7qpZdE)  
[Source Code](https://github.com/pfgithub/spacechan)  
[Website](https://pfgithub.github.io/spacechan)

## running yourself

```bash
# download
git clone https://github.com/pfgithub/spacechan.git
cd spoilerbot
```
---

```bash
# setup
yarn install
```
Create `secret.json` with
<pre>
{
  "token": "<a href="http://discordapp.com/applications/developers/me">Your Bot Token</a>"
}
</pre>

---

```bash
# run
node index.js
```
