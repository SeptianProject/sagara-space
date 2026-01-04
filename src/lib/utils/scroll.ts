export function smoothScrollTo(elementId: string, offset: number = 80) {
	const element = document.getElementById(elementId);
	if (element) {
		const elementPosition = element.getBoundingClientRect().top;
		const offsetPosition = elementPosition + window.pageYOffset - offset;

		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth'
		});
	}
}

export function getCurrentSection(sections: string[]): string {
	const scrollPosition = window.scrollY + 100;

	for (let i = sections.length - 1; i >= 0; i--) {
		const section = document.getElementById(sections[i]);
		if (section && section.offsetTop <= scrollPosition) {
			return sections[i];
		}
	}

	return sections[0];
}
