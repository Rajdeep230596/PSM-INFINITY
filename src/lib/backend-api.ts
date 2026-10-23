const DEFAULT_API = "http://localhost:4000";

export function getBackendApiUrl() {
  return (process.env.NEXT_PUBLIC_API_URL || DEFAULT_API).replace(/\/$/, "");
}

export type SearchHit = {
  id: number;
  slug: string;
  name: string;
  summary: string;
  type: "industry" | "company" | "product";
};

export type SearchResponse = {
  data?: {
    industries?: SearchHit[];
    companies?: SearchHit[];
    products?: SearchHit[];
  };
  error?: string;
};

export type ChatLink = {
  type: "industry" | "company" | "product";
  id: number;
  slug: string;
  name: string;
  summary: string;
  pathHint: string;
};

export type ChatResponse = {
  data?: {
    message: string;
    links: ChatLink[];
    whatsappUrl: string | null;
    aiConfigured: boolean;
  };
  error?: string;
};

export async function searchCatalogue(query: string): Promise<SearchResponse> {
  const response = await fetch(`${getBackendApiUrl()}/api/v1/search?q=${encodeURIComponent(query)}`, {
    headers: { Accept: "application/json" },
  });
  return response.json();
}

export async function postChat(
  messages: Array<{ role: "user" | "assistant"; content: string }>,
): Promise<ChatResponse> {
  const response = await fetch(`${getBackendApiUrl()}/api/v1/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ messages, includeWhatsApp: true }),
  });
  return response.json();
}
