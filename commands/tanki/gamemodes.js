/**
 * Tanki Bot
 * 
 * Command to check gamemodes stats of a given user from tanki ratings.
 * 
 * @author gbfactory
 * @since  10.08.2017
*/

const Discord = require("discord.js");
const snekfetch = require("snekfetch");
const ms = require('ms');

const api = "https://ratings.tankionline.com/get_stat/profile/?user=";

module.exports = {
    name: 'gamemodes',
    description: 'Check the ratings of a player in the different gamemodes.',
    aliases: ['gm', 'modes'],
    usage: '`>gamemodes [nickname]`',
    args: true,
    cooldown: 3,
    execute(client, message, args, con) {

        var nickname = args[0];

        snekfetch.get(api + nickname).then(r => {

            if (r.body.responseType === 'NOT_FOUND') {
                let noUser = new Discord.RichEmbed()
                    .setAuthor('Player not found!')
                    .setColor('#f54242');

                return message.channel.send({ embed: noUser });
            } else if (!r.body.responseType) {
                let noApi = new Discord.RichEmbed()
                    .setAuthor('Tanki Online API unavailable. Try again later.')
                    .setColor('#f54242');
                return message.channel.send({ embed: noApi });
            }

            var res = r.body.response;

            // Name
            var name = res.name;

            //esperienza guadagnata
            var eDM = (r.body.response.modesPlayed[0].scoreEarned).toLocaleString('en'); //dm
            var eTDM = (r.body.response.modesPlayed[1].scoreEarned).toLocaleString('en'); //tdm
            var eCTF = (r.body.response.modesPlayed[2].scoreEarned).toLocaleString('en'); //ctf
            var eCP = (r.body.response.modesPlayed[3].scoreEarned).toLocaleString('en'); //cp
            var eAS = (r.body.response.modesPlayed[4].scoreEarned).toLocaleString('en'); //as
            var eRGB = (r.body.response.modesPlayed[5].scoreEarned).toLocaleString('en'); //rgb
            var eSJGR = (r.body.response.modesPlayed[6].scoreEarned).toLocaleString('en'); //sjgr
            var eJGR = (r.body.response.modesPlayed[7].scoreEarned).toLocaleString('en'); //jgr
            var eSGE = (r.body.response.modesPlayed[8].scoreEarned).toLocaleString('en'); //sge

            //tempo giocato
            var tDM = ms(r.body.response.modesPlayed[0].timePlayed, { long: true }) //dm
            var tTDM = ms(r.body.response.modesPlayed[1].timePlayed, { long: true }) //tdm
            var tCTF = ms(r.body.response.modesPlayed[2].timePlayed, { long: true }) //ctf
            var tCP = ms(r.body.response.modesPlayed[3].timePlayed, { long: true }) //cp
            var tAS = ms(r.body.response.modesPlayed[4].timePlayed, { long: true }) //as
            var tRGB = ms(r.body.response.modesPlayed[5].timePlayed, { long: true }) //rgb
            var tSJGR = ms(r.body.response.modesPlayed[6].timePlayed, { long: true }) //sjgr
            var tJGR = ms(r.body.response.modesPlayed[7].timePlayed, { long: true }) //jgr
            var tSGE = ms(r.body.response.modesPlayed[8].timePlayed, { long: true }) //sge

            var DM = "<:tstar:660257945350701066> **Score**: " + eDM + "\n" + "🕓 **Time**: " + (tDM).toLocaleString('en');
            var TDM = "<:tstar:660257945350701066> **Score**: " + eTDM + "\n" + "🕓 **Time**: " + (tTDM).toLocaleString('en');
            var CTF = "<:tstar:660257945350701066> **Score**: " + eCTF + "\n" + "🕓 **Time**: " + (tCTF).toLocaleString('en');
            var CP = "<:tstar:660257945350701066> **Score**: " + eCP + "\n" + "🕓 **Time**: " + (tCP).toLocaleString('en');
            var AS = "<:tstar:660257945350701066> **Score**: " + eAS + "\n" + "🕓 **Time**: " + (tAS).toLocaleString('en');
            var RGB = "<:tstar:660257945350701066> **Score**: " + eRGB + "\n" + "🕓 **Time**: " + (tRGB).toLocaleString('en');
            var SJGR = "<:tstar:660257945350701066> **Score**: " + eSJGR + "\n" + "🕓 **Time**: " + (tSJGR).toLocaleString('en');
            var JGR = "<:tstar:660257945350701066> **Score**: " + eJGR + "\n" + "🕓 **Time**: " + (tJGR).toLocaleString('en');
            var SGE = "<:tstar:660257945350701066> **Score**: " + eSGE + "\n" + "🕓 **Time**: " + (tSGE).toLocaleString('en');

            //embed
            let gamemodes = new Discord.RichEmbed()
                .setAuthor('Tanki Bot')
                .setTitle(`Ratings - Gamemodes`)
                .setDescription(`Profile of ${name}`)
                .setColor("#87d704")
                .setTimestamp()
                .setThumbnail("https://i.imgur.com/yHWxaka.png")
                .addField("<:MM_DM:605414603245223956> Deathmatch", DM, true)
                .addField("<:MM_TDM:605414603266064438> Team Deathmatch", TDM, true)
                .addField("<:MM_CTF:605414603228315652> Capture The Flag", CTF, true)
                .addField("<:MM_CP:605414603190566918> Control Points", CP, true)
                .addField("<:MM_ASL:605414603207213068> Assault", AS, true)
                .addField("<:MM_RGB:605414603228184576> Rugby", RGB, true)
                .addField("<:MM_JGR:605414603064606721> Solo Juggernaut", SJGR, true)
                .addField("<:MM_JGR:605414603064606721> Juggernaut", JGR, true)
                .addField("<:sge:660455070814568470> Siege", SGE, true);

            message.channel.send({ embed: gamemodes });

        })

    },
};