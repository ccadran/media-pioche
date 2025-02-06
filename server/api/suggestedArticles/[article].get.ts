import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  try {
    const supabase = await serverSupabaseClient(event);

    const articleId = event.context?.params!.article;

    const { data, error } = await supabase
      .from("suggested-article")
      .select("*")
      .eq("article_id", articleId);
    return data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return createError({
      statusCode: 500,
      statusMessage: "Erreur lors de la récupération des articles",
    });
  }
});
