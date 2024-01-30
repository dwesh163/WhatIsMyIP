require('dotenv').config();
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.TOKEN);

const chatId = process.env.CHAT_ID;

const os = require('os');

function getNetworkInfo() {
	const networkInterfaces = os.networkInterfaces();
	const interfaces = Object.keys(networkInterfaces);

	let result = {};

	interfaces.forEach((interfaceName) => {
		const interfaceData = networkInterfaces[interfaceName];
		interfaceData.forEach((data) => {
			if (!data.internal && data.family === 'IPv4') {
				result.ipAddress = data.address;
				result.macAddress = data.mac;
			}
		});
	});

	result.hostname = os.hostname();

	return result;
}

const { ipAddress, macAddress, hostname } = getNetworkInfo();

bot.telegram.sendMessage(parseInt(chatId), `Adresse IP: ${ipAddress}\nAdresse MAC: ${macAddress}\nHostname: ${hostname}\n`);
