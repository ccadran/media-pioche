import { serverSupabaseClient } from "#supabase/server";


export default defineEventHandler(async (event) => {
    try {
        const supabase = await serverSupabaseClient(event);

    } catch (error) {
        console.error("Error login articles:", error);
        return createError({
        statusCode: 500,
        statusMessage: "Erreur lors de authentication",
        });
    }
});