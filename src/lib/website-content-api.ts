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

export interface WebsitePricingFeature {
  id: string;
  text: string;
  isIncluded: boolean;
  sortOrder: number;
}

export interface WebsitePricingPlan {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  billingPeriod: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  isPopular: boolean;
  isActive: boolean;
  sortOrder: number;
  features: WebsitePricingFeature[];
}

export interface WebsiteContentResponse {
  logos: WebsiteLogo[];
  testimonials: WebsiteTestimonial[];
  faqs: WebsiteFaq[];
}

export interface ContactSubmissionRequest {
  fullName: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
}

async function apiFetch<T>(path: string): Promise<T[]> {
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
    const json = await response.json();
    // Backend returns { items: T[] } — unwrap it
    if (json && Array.isArray(json.items)) return json.items as T[];
    if (Array.isArray(json)) return json as T[];
    return [] as T[];
  } catch (error) {
    throw new Error(
      `Failed to parse JSON from ${url}: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

async function apiPost<TResponse>(path: string, body: unknown): Promise<TResponse | null> {
  const url = `${getBaseUrl()}${path}`;

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    throw new Error(
      `Network error while requesting ${url}: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }

  if (!response.ok) {
    let responseBody = "";
    try {
      responseBody = await response.text();
    } catch {
      responseBody = "";
    }

    throw new Error(
      `API request failed for ${url}: ${response.status} ${response.statusText}${responseBody ? ` - ${responseBody}` : ""}`,
    );
  }

  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return (await response.json()) as TResponse;
  }

  return null;
}

export const websiteContentApi = {
  getLogos(): Promise<WebsiteLogo[]> {
    return apiFetch<WebsiteLogo>("/api/website-content/logos");
  },

  getTestimonials(): Promise<WebsiteTestimonial[]> {
    return apiFetch<WebsiteTestimonial>("/api/website-content/testimonials");
  },

  getFaqs(): Promise<WebsiteFaq[]> {
    return apiFetch<WebsiteFaq>("/api/website-content/faqs");
  },

  getPricing(): Promise<WebsitePricingPlan[]> {
    return apiFetch<WebsitePricingPlan>("/api/website-content/pricing");
  },

  getAll(): Promise<WebsiteContentResponse> {
    return apiFetch<never>("/api/website-content") as unknown as Promise<WebsiteContentResponse>;
  },

  submitContactForm(payload: ContactSubmissionRequest): Promise<void> {
    return apiPost<void>("/api/contact-submissions", payload).then(() => undefined);
  },
};
