export interface InViewOptions {
	/** Threshold untuk trigger animasi (0-1) */
	threshold?: number;
	/** Root margin untuk area trigger */
	rootMargin?: string;
	/** Apakah animasi hanya terjadi sekali */
	once?: boolean;
}

/**
 * Svelte action untuk mendeteksi elemen masuk viewport
 * Menghormati prefer-reduced-motion untuk aksesibilitas
 */
export function inView(node: HTMLElement, options: InViewOptions = {}) {
	const { threshold = 0.2, rootMargin = '0px', once = true } = options;

	// Check if user prefers reduced motion
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (prefersReducedMotion) {
		// Jika user prefer reduced motion, langsung tampilkan tanpa animasi
		node.style.opacity = '1';
		node.style.transform = 'none';
		return {};
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					node.classList.add('in-view');

					if (once) {
						observer.unobserve(node);
					}
				} else if (!once) {
					node.classList.remove('in-view');
				}
			});
		},
		{
			threshold,
			rootMargin
		}
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}

/**
 * Presets animasi yang umum digunakan
 */
export const animationPresets = {
	fadeIn: {
		duration: 600,
		delay: 0
	},
	slideUp: {
		duration: 600,
		delay: 0,
		y: 30
	},
	slideDown: {
		duration: 600,
		delay: 0,
		y: -30
	},
	slideLeft: {
		duration: 600,
		delay: 0,
		x: 30
	},
	slideRight: {
		duration: 600,
		delay: 0,
		x: -30
	},
	scaleIn: {
		duration: 600,
		delay: 0,
		scale: 0.9
	}
} as const;
