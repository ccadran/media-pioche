import { serverSupabaseClient } from "#supabase/server";

export default eventHandler(async (event) => {
  try {
    const client = await serverSupabaseClient(event);

    // Récupération de l'ID depuis les paramètres de l'événement
    const weekId = event.context?.params!.week;

    // Requête pour récupérer la catégorie spécifique
    const { data, error } = await client
      .from("article")
      .select("*")
      .eq("week", weekId);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error fetching category:", error);
    return createError({
      statusCode: 500,
      statusMessage: "Erreur lors de la récupération de la catégorie",
    });
  }
});
