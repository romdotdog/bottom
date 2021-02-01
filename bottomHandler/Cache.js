class Cache {
    #cache

    constructor() {
        // Create channel dict if it doesn't exist
        this.#cache = new Proxy({}, {
            get(target, prop) {
                if (!target[prop])
                    target[prop] = {}
                return target[prop]
            }
        })
    }

    get(message) {
        const check = this.#cache[message.channel_id][message.id];
        if (check) {
            return check;
        }
    }

    set(message, value) {
        this.#cache[message.channel_id][message.id] = value
    }

    update(message, f) {
        return this.#cache[message.channel_id][message.id] = f(
            this.#cache[message.channel_id][message.id]
        );
    }

    wipe(removeMessage) {
        for (let channelId in this.cache) {
            for (let messageId in this.cache[channelId]) {
                const originalContent = this.cache[channelId][messageId]
                                    ?.originalContent;
                if (originalContent)
                    removeMessage(channelId, messageId, originalContent);
                delete this.cache[channelId][messageId];
            }
        }
        this.#cache = {};
    }
}

module.exports = Cache