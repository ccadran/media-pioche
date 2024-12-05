import { serverSupabaseClient } from "#supabase/server";

export default eventHandler(async (event) => {
  try {
    const client = await serverSupabaseClient(event);

    const articleId = event.context?.params!.id;

    const { data, error } = await client
      .from("article")
      .select("*")
      .eq("id", articleId);

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
