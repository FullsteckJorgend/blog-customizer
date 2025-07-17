import { useState, useEffect, useRef } from 'react';

//Хук был с максимальной добросовестностью украден со Stack Overflow.
//Хук был написан на JS/JSX, пришлось совсем чуть-чуть додавить типизации.
export default function useDetectClickOutSideComponent(initialIsVisible: any) {
	const [isComponentVisible, setIsComponentVisible] =
		useState(initialIsVisible);
	const ref = useRef<HTMLElement | null>(null);

	const handleHideDropdown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			setIsComponentVisible(false);
		}
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (ref.current && !ref.current.contains(event.target as Node)) {
			setIsComponentVisible(false);
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', handleHideDropdown, true);
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('keydown', handleHideDropdown, true);
			document.removeEventListener('click', handleClickOutside, true);
		};
	}),
		[isComponentVisible];

	return { ref, isComponentVisible, setIsComponentVisible };
}
