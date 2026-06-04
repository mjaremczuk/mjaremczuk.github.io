export type SupportedLanguage = 'en' | 'pl';

interface Translations {
	title: string;
	availability: string;
	heroTitle: string;
	heroTitleGradient: string;
	heroSubtitle: string;
	projectsTitle: string;
	projectsDescription: string;
	labTitle: string;
	labDescription: string;
	footer: string;
}

const translations: Record<SupportedLanguage, Translations> = {
	en: {
		title: "Michał Jaremczuk | Senior Android Developer",
		availability: "Open for collaboration",
		heroTitle: "Crafting mobile solutions with",
		heroTitleGradient: "experience",
		heroSubtitle: "I am a Senior Android Developer with over 10 years of experience in native app development. For the last 2 years, I have also been building cross-platform solutions using Kotlin Multiplatform (KMP).",
		projectsTitle: "Featured Projects",
		projectsDescription: "With a decade of experience in Android development, my passion is building robust and high-performance mobile applications. For the past two years, I have expanded my expertise to include Kotlin Multiplatform (KMP), enabling me to create shared business logic for both Android and iOS. The projects below demonstrate my commitment to clean architecture, modern development practices, and creating user-centric solutions.",
		labTitle: "Explore My Apps",
		labDescription: "Interact with a live preview of my mobile applications. Click on an app to see its details and install it on your device.",
		footer: "Built with Astro & CSS."
	},
	pl: {
		title: "Michał Jaremczuk | Senior Android Developer",
		availability: "Otwarty na współpracę",
		heroTitle: "Tworzenie mobilnych rozwiązań z",
		heroTitleGradient: "doświadczeniem",
		heroSubtitle: "Jestem Senior Android Developerem z ponad 10-letnim doświadczeniem w tworzeniu aplikacji natywnych. Od 2 lat buduję również rozwiązania wieloplatformowe z użyciem Kotlin Multiplatform (KMP).",
		projectsTitle: "Wyróżnione Projekty",
		projectsDescription: "Z dekadą doświadczenia w tworzeniu aplikacji na Androida, moją pasją jest budowanie solidnych i wydajnych aplikacji mobilnych. Przez ostatnie dwa lata poszerzyłem swoje kompetencje o Kotlin Multiplatform (KMP), co pozwala mi tworzyć współdzieloną logikę biznesową dla Androida i iOS. Poniższe projekty demonstrują moje zaangażowanie w czystą architekturę, nowoczesne praktyki programistyczne i tworzenie rozwiązań zorientowanych na użytkownika.",
		labTitle: "Eksploruj moje aplikacje",
		labDescription: "Sprawdź podgląd na żywo moich aplikacji mobilnych. Kliknij na wybraną aplikację, aby zobaczyć jej szczegóły i zainstalować ją na swoim urządzeniu.",
		footer: "Zbudowano z Astro i CSS."
	}
};

/**
 * Retrieves the translation object for the given language.
 * Falls back to English if the language is unsupported.
 */
export function getTranslations(lang: string | null): Translations {
	const validLang = lang === 'pl' ? 'pl' : 'en';
	return translations[validLang];
}

/**
 * Parses the URL parameters to determine the current language.
 */
export function getCurrentLanguage(url: URL): SupportedLanguage {
	return url.searchParams.get('lang') === 'pl' ? 'pl' : 'en';
}