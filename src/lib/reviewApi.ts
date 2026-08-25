export async function readReviewResponse(response: Response) {
  const body = await response.text();
  if (!body) return {} as { message?: string; error?: string };

  try {
    return JSON.parse(body) as { message?: string; error?: string };
  } catch {
    return {
      error: response.ok
        ? "Réponse inattendue du service de validation."
        : `Service de validation indisponible (HTTP ${response.status}).`,
    };
  }
}
