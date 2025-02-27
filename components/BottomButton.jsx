const {
	React,
	getModule,
	getModuleByDisplayName
} = require("powercord/webpack");

const Tooltip = getModuleByDisplayName("Tooltip", false);
const classes = getModule(["icon", "isHeader"], false);
const { Button } = getModule(
	(m) => m.default && m.default.displayName === "MiniPopover",
	false
);

module.exports = class BottomButton extends (
	React.Component
) {
	constructor(props) {
		super(props);
	}

	generateToastID() {
		return (
			"power-bottom-" +
			Math.random()
				.toString(36)
				.replace(/[^a-z]+/g, "")
				.substr(0, 5)
		);
	}

	render() {
		const { handler, message } = this.props;
		return (
			<>
				{handler.isBottom(message) && (
					<Tooltip color="black" postion="top" text="Translate Bottom">
						{({ onMouseLeave, onMouseEnter }) => (
							<Button
								className={`message-power-bottom-button`}
								onClick={async () => {
									try {
										handler.translateMessage(message);
									} catch (e) {
										console.error(e);
										powercord.api.notices.sendToast(this.generateToastID(), {
											header: "Power Bottom",
											content: e.message,
											icon: "exclamation-triangle",
											timeout: 3000 // 3e3, // No.
										});
									}
								}}
								onMouseEnter={onMouseEnter}
								onMouseLeave={onMouseLeave}
							>
								<svg
									x="0"
									y="0"
									aria-hidden="false"
									width="22"
									height="22"
									viewBox="0 0 36 36"
									fill="currentColor"
									class={classes.icon}
								>
									<circle fill="#FFCC4D" cx="18" cy="18" r="18" />
									<path
										fill="#65471B"
										d="M20.996 27c-.103 0-.206-.016-.309-.049-1.76-.571-3.615-.571-5.375 0-.524.169-1.089-.117-1.26-.642-.171-.525.117-1.089.643-1.26 2.162-.702 4.447-.702 6.609 0 .525.171.813.735.643 1.26-.137.421-.529.691-.951.691z"
									/>
									<path
										fill="#FFF"
										d="M30.335 12.068c-.903 2.745-3.485 4.715-6.494 4.715-.144 0-.289-.005-.435-.014-1.477-.093-2.842-.655-3.95-1.584.036.495.076.997.136 1.54.152 1.388.884 2.482 2.116 3.163.82.454 1.8.688 2.813.752 1.734.109 3.57-.28 4.873-.909 1.377-.665 2.272-1.862 2.456-3.285.183-1.415-.354-2.924-1.515-4.378z"
									/>
									<path
										fill="#65471B"
										d="M21.351 7.583c-1.297.55-1.947 2.301-1.977 5.289l.039.068c.897 1.319 2.373 2.224 4.088 2.332.114.007.228.011.341.011 2.634 0 4.849-1.937 5.253-4.524-.115-.105-.221-.212-.343-.316-3.715-3.17-6.467-3.257-7.401-2.86z"
									/>
									<path
										fill="#F4900C"
										d="M23.841 16.783c3.009 0 5.591-1.97 6.494-4.715-.354-.443-.771-.88-1.241-1.309-.404 2.587-2.619 4.524-5.253 4.524-.113 0-.227-.004-.341-.011-1.715-.108-3.191-1.013-4.088-2.332l-.039-.068c-.007.701.021 1.473.083 2.313 1.108.929 2.473 1.491 3.95 1.584.146.01.291.014.435.014z"
									/>
									<circle fill="#FFF" cx="21.413" cy="10.705" r="1.107" />
									<path
										fill="#FFF"
										d="M12.159 16.783c-3.009 0-5.591-1.97-6.494-4.715-1.161 1.454-1.697 2.963-1.515 4.377.185 1.423 1.079 2.621 2.456 3.285 1.303.629 3.138 1.018 4.873.909 1.013-.064 1.993-.297 2.813-.752 1.231-.681 1.963-1.775 2.116-3.163.06-.542.1-1.042.136-1.536-1.103.923-2.47 1.487-3.95 1.58-.146.011-.291.015-.435.015z"
									/>
									<path
										fill="#65471B"
										d="M12.159 15.283c.113 0 .227-.004.341-.011 1.715-.108 3.191-1.013 4.088-2.332l.039-.068c-.031-2.988-.68-4.739-1.977-5.289-.934-.397-3.687-.31-7.401 2.859-.122.104-.227.211-.343.316.404 2.588 2.619 4.525 5.253 4.525z"
									/>
									<path
										fill="#F4900C"
										d="M16.626 12.872l-.039.068c-.897 1.319-2.373 2.224-4.088 2.332-.114.007-.228.011-.341.011-2.634 0-4.849-1.937-5.253-4.524-.47.429-.887.866-1.241 1.309.903 2.745 3.485 4.715 6.494 4.715.144 0 .289-.005.435-.014 1.48-.093 2.847-.657 3.95-1.58.062-.841.091-1.614.083-2.317z"
									/>
									<path
										fill="#FFF"
										d="M9.781 11.81c.61-.038 1.074-.564 1.035-1.174-.038-.61-.564-1.074-1.174-1.036-.61.038-1.074.564-1.036 1.174.039.61.565 1.074 1.175 1.036z"
									/>
								</svg>
							</Button>
						)}
					</Tooltip>
				)}
				{handler.isTranslated(message) && (
					<Tooltip color="black" postion="top" text="Revert to Original">
						{({ onMouseLeave, onMouseEnter }) => (
							<Button
								className={`message-power-bottom-revert`}
								onClick={async () => {
									handler.revertMessage(message);
								}}
								onMouseEnter={onMouseEnter}
								onMouseLeave={onMouseLeave}
							>
								<svg
									x="0"
									y="0"
									aria-hidden="false"
									width="22"
									height="22"
									viewBox="0 0 36 36"
									fill="currentColor"
									class={classes.icon}
								>
									<path
										fill="#FFCC4D"
										d="M36 18c0 9.941-8.059 18-18 18-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"
									/>
									<path
										fill="#664500"
										d="M25.485 27.879C25.44 27.7 24.317 23.5 18 23.5c-6.318 0-7.44 4.2-7.485 4.379-.055.217.043.442.237.554.195.111.439.078.6-.077.019-.019 1.954-1.856 6.648-1.856s6.63 1.837 6.648 1.855c.096.095.224.145.352.145.084 0 .169-.021.246-.064.196-.112.294-.339.239-.557zM29.001 14c-.305 0-.604-.138-.801-.4-2.432-3.244-6.514-.846-6.686-.743-.475.285-1.089.13-1.372-.343-.284-.474-.131-1.088.343-1.372 1.998-1.199 6.514-2.477 9.314 1.257.332.442.242 1.069-.2 1.4-.179.136-.389.201-.598.201zM6.999 14c-.208 0-.419-.065-.599-.2-.442-.331-.531-.958-.2-1.4 2.801-3.734 7.317-2.456 9.314-1.257.474.284.627.898.343 1.372-.284.473-.896.628-1.37.344-.179-.106-4.274-2.475-6.688.742-.195.261-.496.399-.8.399zM29 16c0-.552-.447-1-1-1h-7c-.553 0-1 .448-1 1s.447 1 1 1h5.092c.207.581.756 1 1.408 1 .828 0 1.5-.671 1.5-1.5 0-.11-.014-.217-.036-.321.012-.06.036-.116.036-.179zm-13 0c0-.552-.448-1-1-1H8c-.552 0-1 .448-1 1s.448 1 1 1h5.092c.207.581.756 1 1.408 1 .828 0 1.5-.671 1.5-1.5 0-.11-.014-.217-.036-.321.011-.06.036-.116.036-.179z"
									/>
								</svg>
							</Button>
						)}
					</Tooltip>
				)}
			</>
		);
	}
};
