export default function formatHours(hours) {
	const spaceDateHours = hours.replace('T', ' / ');
	const removeSeconds = spaceDateHours.slice(0, spaceDateHours.length - 4);
	return removeSeconds
}