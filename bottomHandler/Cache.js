class Cache {
	#cache;

	constructor() {
		// Create channel dict if it doesn't exist
		this.#cache = new Proxy(
			{},
			{
				get(target, prop) {
					if (!target[prop]) target[prop] = {};
					return target[prop];
				}
			}
		);
	}

	get(message) {
		const check = this.#cache[message.channel_id][message.id];
		if (check) {
			return check;
		}
	}

	set(message, value) {
		this.#cache[message.channel_id][message.id] = value;
	}

	update(message, f) {
		return (this.#cache[message.channel_id][message.id] = f(
			this.#cache[message.channel_id][message.id]
		));
	}

	remove({ channel_id, id }, removeMessage) {
        if (removeMessage) {
            const originalContent = this.cache[channel_id][id]
                            ?.originalContent;
            if (originalContent)
                removeMessage(channel_id, id, originalContent);
        }
		delete this.cache[channel_id][id];
	}

	wipe(removeMessage) {
		for (let channelId in this.cache) {
			for (let messageId in this.cache[channelId]) {
				this.remove(
					{
						channel_id: channelId,
						id: messageId
					},
					removeMessage
				);
			}
		}
	}
}

module.exports = Cache