const VITE_APP_API_URL = import.meta.env.VITE_APP_API_URL;

function getBaseUrl(): string {
  if (!VITE_APP_API_URL || typeof VITE_APP_API_URL !== "string") {
    throw new Error("Missing required env var: VITE_APP_API_URL");
  }

  return VITE_APP_API_URL.replace(/\/$/, "");
}

export interface WebsiteLogo {
  id: string;
  name: string;
  imageUrl: string;
  altText?: string;
  href?: string;
}

export interface WebsiteTestimonial {
  id: string;
  authorName: string;
  authorTitle?: string;
  authorAvatarUrl?: string;
  content: string;
  rating?: number;
}

export interface WebsiteFaq {
  id: string;
  question: string;
  answer: string;
  order?: number;
}

export interface WebsiteContentResponse {
  logos: WebsiteLogo[];
  testimonials: WebsiteTestimonial[];
  faqs: WebsiteFaq[];
}

async function apiFetch<T>(path: string): Promise<T> {
  const url = `${getBaseUrl()}${path}`;

  let response: Response;
  try {
    response = await fetch(url);
  } catch (error) {
    throw new Error(
      `Network error while requesting ${url}: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }

  if (!response.ok) {
    throw new Error(
      `API request failed for ${url}: ${response.status} ${response.statusText}`,
    );
  }

  try {
    return (await response.json()) as T;
  } catch (error) {
    throw new Error(
      `Failed to parse JSON from ${url}: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

export const websiteContentApi = {
  getLogos(): Promise<WebsiteLogo[]> {
    return apiFetch<WebsiteLogo[]>("/api/website-content/logos");
  },

  getTestimonials(): Promise<WebsiteTestimonial[]> {
    return apiFetch<WebsiteTestimonial[]>("/api/website-content/testimonials");
  },

  getFaqs(): Promise<WebsiteFaq[]> {
    return apiFetch<WebsiteFaq[]>("/api/website-content/faqs");
  },

  getAll(): Promise<WebsiteContentResponse> {
    return apiFetch<WebsiteContentResponse>("/api/website-content");
  },
};
