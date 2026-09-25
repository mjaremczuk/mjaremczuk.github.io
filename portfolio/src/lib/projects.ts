import gPlay from 'google-play-scraper';
import type { Project } from '../types/Project';
import googlePlayCache from '../data/googlePlayCache.json';

const TWO_SOULS_WEB_HREF = 'https://twosouls-3992f.web.app/';

/**
 * Zwraca listę wszystkich projektów dewelopera, łącząc dane 
 * z różnych źródeł (np. Google Play, GitHub).
 */
export async function getAllProjects(lang: 'en' | 'pl'): Promise<Project[]> {
	const googlePlayProjects = await fetchGooglePlayProjects(lang);
	const otherProjects = getStaticProjects(lang);

	return [...otherProjects, ...googlePlayProjects];
}

/**
 * Oddzielna funkcja tylko dla aplikacji mobilnych (przydatne np. do emulatora).
 */
export async function getMobileApps(lang: 'en' | 'pl'): Promise<Project[]> {
    return await fetchGooglePlayProjects(lang);
}

/**
 * Logika pobierania i transformacji danych z Google Play.
 */
async function fetchGooglePlayProjects(lang: 'en' | 'pl'): Promise<Project[]> {
	try {
		const developerApps = await gPlay.developer({
			devId: "Michał Jaremczuk",
			country: "pl"
		});

		const appDetailPromises = developerApps.map(app => 
			gPlay.app({ appId: app.appId, country: "pl", lang: lang })
		);

		const fullAppDetails = await Promise.all(appDetailPromises);

		return fullAppDetails.map(app => {
			const project: Project = {
				title: app.title,
				description: app.summary,
				tags: app.categories.map(g => g.name),
				stars: app.ratings,
				forks: app.minInstalls,
				metric: "User Score",
				metricValue: Math.round((app.score / 5) * 100),
				href: app.url,
				status: "active",
				accent: "primary",
				icon: app.icon
			};

			// Add web version link for "Two Souls"
			if (app.title.toLowerCase().includes('twosouls')) {
				project.webHref = TWO_SOULS_WEB_HREF;
			}

			return project;
		});
	} catch (error) {
		console.warn("Using cached fallback for Google Play apps (offline/rate-limit):", error);
		const fallback = (googlePlayCache as Record<string, Project[]>)[lang] || (googlePlayCache as Record<string, Project[]>)['pl'] || [];
		return fallback;
	}
}

/**
 * Źródło danych statycznych (np. projekty webowe, open-source).
 */
function getStaticProjects(lang: 'en' | 'pl'): Project[] {
	return [
		{
			title: "Budzik Challenge",
			description: lang === 'pl'
				? "Nowoczesna platforma internetowa dla trenera przygotowania motorycznego Krzysztofa Budzisza (CrossFit Bytom). Zawiera system kalendarza i rejestracji na wydarzenia sportowe, zawody Hyrox/CrossFit oraz obozy treningowe, zintegrowana z mediami społecznościowymi."
				: "A modern web platform for strength & conditioning coach Krzysztof Budzisz (CrossFit Bytom). Features event calendar, registration for Hyrox/CrossFit competitions and training camps, and community integrations.",
			tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
			metric: "Performance",
			metricValue: 99,
			href: "https://www.budzik-challenge.pl/",
			webHref: "https://www.budzik-challenge.pl/",
			status: "active",
			accent: "secondary",
			icon: "/icons/budzik-challenge.svg"
		}
	];
}