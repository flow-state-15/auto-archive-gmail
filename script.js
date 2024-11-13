const simClick = (element) => {
	const mdown = new MouseEvent("mousedown", {
		bubbles: true,
		cancelable: true,
		view: window,
		clientX: element.getBoundingClientRect().x,
		clientY: element.getBoundingClientRect().y,
	});
	const mup = new MouseEvent("mouseup", {
		bubbles: true,
		cancelable: true,
		view: window,
		clientX: element.getBoundingClientRect().x,
		clientY: element.getBoundingClientRect().y,
	});
	element.dispatchEvent(mdown);
	element.dispatchEvent(mup);
	element.click();
};
const pageSelect = document.querySelector(
	'span[jslog="170807; u014N:cOuCgd,Kr2w4b;"]'
);
if (pageSelect) {
	pageSelect.click();
} else {
	console.log("didnt find checkbox, aborting");
	return;
}
if (pageSelect.getAttribute("aria-checked")) {
	console.log("checked");
} else {
	console.log("not checked, aborting");
	return;
}
const archive = document.querySelector("div[aria-label='Archive']");
