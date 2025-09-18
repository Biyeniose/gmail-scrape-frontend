// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export interface UberEmailsResponse {
  uber_emails: any[];
  total_count: number;
  query: string;
}

export interface EmailStatsResponse {
  total_uber_emails: number;
  uber_rides: number;
  uber_eats: number;
  total_spent: number;
  currency: string;
  date_range: {
    start?: string;
    end?: string;
  };
}

export const apiService = {
  async getUberEmails(
    googleTokens: { access_token: string; refresh_token: string | null },
    userId: string
  ): Promise<UberEmailsResponse> {
    const response = await fetch(`${API_BASE_URL}/emails/uber2`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        google_access_token: googleTokens.access_token,
        google_refresh_token: googleTokens.refresh_token,
        user_id: userId,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', response.status, errorText);
      throw new Error(`Failed to fetch Uber emails: ${response.status}`);
    }

    return response.json();
  },

  async getEmailStats(
    googleTokens: { access_token: string; refresh_token: string | null },
    userId: string,
    startDate?: string,
    endDate?: string
  ): Promise<EmailStatsResponse> {
    const response = await fetch(`${API_BASE_URL}/emails/stats2`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        google_access_token: googleTokens.access_token,
        google_refresh_token: googleTokens.refresh_token,
        user_id: userId,
        start_date: startDate,
        end_date: endDate,
        max_results: 100,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', response.status, errorText);
      throw new Error(`Failed to fetch email stats: ${response.status}`);
    }

    return response.json();
  },
};
