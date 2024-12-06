import { serverSupabaseClient } from "#supabase/server";


export default defineEventHandler(async (event) => {
    try {
        const supabase = await serverSupabaseClient(event);

        const { error } = await supabase.auth.signOut({ scope: 'local' })

        if(error){
            throw createError({
                statusCode: 400,
                statusMessage: error.message,
            })
        } else {
            return {
                message: "Succès logout"
            };
        }
    } catch (error) {
        console.error("Error logout :", error);
        return createError({
            statusCode: 500,
            statusMessage: "Erreur lors du logout",
        });
    }
});