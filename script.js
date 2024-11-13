async function runScript() {
	const selectAll = async () => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const pageSelect = document.querySelector(
					'span[jslog="170807; u014N:cOuCgd,Kr2w4b;"]'
				);
				if (pageSelect) {
					pageSelect.click();
				} else {
					reject("didnt find checkbox, aborting");
				}
				if (pageSelect.getAttribute("aria-checked")) {
					resolve("checked");
				} else {
					reject("not checked, aborting");
				}
			}, 250);
		});
	};

	const runArchive = async () => {
		return new Promise((resolve, reject) => {
			const archive = document.querySelector("div[aria-label='Archive']");
			if (!archive) {
				reject("archive not found, aborting");
			}
			setTimeout(() => {
				resolve("running sim click on archive");
			}, 250);
		});
	};

	const simClick = async (element) => {
		return new Promise((resolve, reject) => {
			const mup = new MouseEvent("mouseup", {
				bubbles: true,
				cancelable: true,
				view: window,
				clientX: element.getBoundingClientRect().x,
				clientY: element.getBoundingClientRect().y,
			});
			const mdown = new MouseEvent("mousedown", {
				bubbles: true,
				cancelable: true,
				view: window,
				clientX: element.getBoundingClientRect().x,
				clientY: element.getBoundingClientRect().y,
			});
			setTimeout(() => {
				const d1 = element.dispatchEvent(mdown);
				const d2 = element.dispatchEvent(mup);
				element.click();
				resolve("simClick");
			}, 500);
		});
	};

	const findForward = async () => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const forward = document.querySelector(
					'div[jslog="126439; u014N:cOuCgd,Kr2w4b"][aria-label="Older"]'
				);
				if (!forward || forward.getAttribute("aria-disabled") === "true") {
					console.log("forward not found, aborting");
					reject(null);
					return;
				}
				resolve(forward);
			}, 500);
		});
	};

	while (await findForward().then((el) => el)) {
		await selectAll().then((r) => console.log(r));
		await runArchive().then((r) => console.log(r));
		await findForward()
			.then((r) => simClick(r))
			.catch(() => console.log("findforward failed"));
	}
}
