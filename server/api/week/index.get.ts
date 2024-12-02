import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  try {
    const supabase = await serverSupabaseClient(event);
    const { data, error } = await supabase.from("week").select("*");
    return data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return createError({
      statusCode: 500,
      statusMessage: "Erreur lors de la récupération des articles",
    });
  }
});
