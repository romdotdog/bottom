const { getModule, FluxDispatcher } = require("powercord/webpack");
const { getMessage } = getModule(["getMessages"], false);

const Cache = require("./Cache.js");

class BottomHandler {
	constructor(decode) {
		this.cache = new Cache();
		this.re = /((?:((?:\uD83E\uDEC2)?(?:💖)*(?:✨)*(?:🥺)*(?:,)*(❤️)?)(?:👉👈|\u200b))+)/gm;
		this.decode = decode;
	}

	isTranslated(message) {
        const originalContent = this.cache.get(message)?.originalContent
		return originalContent && originalContent !== message.content;
	}

	isBottom(message) {
		return message.content.match(this.re);
	}

	translate(text) {
		return text.replace(
			this.re,
			(str, p1, offset, s) => this.decode(p1) || p1
		)
	}

	revertMessage(message) {
        const cached = this.cache.get(message)
        cached.layers = 0
		message.content = cached.originalContent;
		this.updateMessage(message);
	}

	translateMessage(message) {
		if (!message.content || message.content.length === 0) {
			return "";
		}

		const cached = this.cache.update(
			message,
			(m) => m || { originalContent: message.content, layers: 0 }
		);

		// the message hasn't been edited, let's try to decode it
		let translated = this.translate(message.content);
		if (translated === message.content) {
			// we don't want to do anything if there is no bottom
			// since the translation fails, mark this message to not show the indicator
			cached.top = true;
			throw new Error("No Bottom detected 🥺");
		} else {
			cached.layers = cached.layers + 1;
			message.content = translated;
			this.updateMessage(message);
		}
	}

	updateMessage(message) {
		FluxDispatcher.dirtyDispatch({
			bottomTranslation: true,
			type: "MESSAGE_UPDATE",
			message
		});
	}

	clearCache() {
		this.cache.wipe(this.removeMessage.bind(this));
	}

	removeMessage(channelId, messageId, originalContent) {
        let message = getMessage(channelId, messageId);
        if (originalContent) message.content = originalContent;
		this.updateMessage(message);
	}
}

module.exports = BottomHandler;
