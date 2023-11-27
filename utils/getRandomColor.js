const getRandomColor = () => {
	const letters = '0123456789ABCDEF';
	let color = '#Ff';
	for (let i = 0; i < 4; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};

export default getRandomColor;
