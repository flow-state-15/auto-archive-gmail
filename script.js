async function runScript() {
	const dangerSleepMilli = (time) => {
		// param in milliseconds
		const start = Date.now();
		while (Date.now() - start < time) {}
	};
	const simClick = (element) => {
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
		const d1 = element.dispatchEvent(mdown);
		const d2 = element.dispatchEvent(mup);
		element.click();
		if (!d1 || !d2) {
			return false;
		} else {
			return true;
		}
	};
	const selectAll = async () => {
		try {
			new Promise((resolve, reject) => {
				setTimeout(() => {
					const pageSelect = document.querySelector(
						'span[jslog="170807; u014N:cOuCgd,Kr2w4b;"]'
					);
					if (pageSelect) {
						pageSelect.click();
					} else {
						console.log("didnt find checkbox, aborting");
						reject("didnt find checkbox, aborting");
					}
					if (pageSelect.getAttribute("aria-checked")) {
						console.log("checked");
						resolve(true);
					} else {
						console.log("not checked, aborting");
						reject("not checked, aborting");
					}
				}, 250);
			});
		} catch (e) {
			console.error("selectall failed, error: ", e);
		}
	};

	const runArchive = async () => {
		try {
			new Promise((resolve, reject) => {
				const archive = document.querySelector("div[aria-label='Archive']");
				if (!archive) {
					console.log("archive not found, aborting");
					reject("archive not found, aborting");
				}
				setTimeout(() => {
					resolve(simClick(archive));
				}, 250);
			});
		} catch (e) {
			console.error("runarchive failed, e: ", e);
		}
	};

	const findForward = new Promise((resolve, reject) => {
		const forward = document.querySelector(
			'div[jslog="126439; u014N:cOuCgd,Kr2w4b"][aria-label="Older"]'
		);
		if (!forward || forward.getAttribute("aria-disabled") === "true") {
			console.log("forward not found, aborting");
			reject("forward not found, aborting");
			return;
		}
		resolve(forward);
	});

	while (await findForward()) {
		selectAll();

		setTimeout(() => {
			runArchive();
			selectAll();
		}, 500);

		setTimeout(() => {
			const forward = findForward();
			simClick(forward);
		}, 1000);
	}
}

runScript();
