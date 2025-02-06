import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  try {
    //const { email, password } =  getQuery(event) as { email?: string; password?: string };

    const { email, password } = await readBody(event);

    if (!email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Email et MDP requis",
      });
    }

    const supabase = await serverSupabaseClient(event);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw createError({
        statusCode: 400,
        statusMessage: error.message,
      });
    }

    return {
      message: "Succès login",
      user: data.user,
    };
  } catch (error) {
    console.error("Erreur login :", error);
    return createError({
      statusCode: 500,
      statusMessage: "Erreur lors de authentication",
    });
  }
});
