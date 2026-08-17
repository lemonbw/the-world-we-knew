const CHAPTERS_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/chapters`;
const CSRF_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/csrf/`;

async function getCSRFToken() {
  const response = await fetch(CSRF_API_URL, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to get CSRF token');
  }

  const data = await response.json();

  return data.csrftoken;
}

export async function getChapters() {
  const response = await fetch(CHAPTERS_API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch chapters');
  }

  return response.json();
}

export async function getChapter(id: number) {
  const response = await fetch(`${CHAPTERS_API_URL}/${id}/`);

  if (!response.ok) {
    throw new Error('Failed to fetch chapter');
  }

  return response.json();
}

export async function createChapter(data: {
  title: string;
  slug: string;
  content: string;
  chapter: number;
  volume: number;
  symbols: number;
}) {
  const csrfToken = await getCSRFToken();

  const response = await fetch(CHAPTERS_API_URL, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create chapter');
  }

  return response.json();
}

export async function updateChapter(
  id: number,
  data: {
    title?: string;
    slug?: string;
    content?: string;
    chapter?: number;
    volume?: number;
    symbols?: number;
  },
) {
  const csrfToken = await getCSRFToken();

  const response = await fetch(`${CHAPTERS_API_URL}/${id}/`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update chapter');
  }

  return response.json();
}

export async function deleteChapter(id: number) {
  const csrfToken = await getCSRFToken();

  const response = await fetch(`${CHAPTERS_API_URL}/${id}/`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'X-CSRFToken': csrfToken,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete chapter');
  }
}
