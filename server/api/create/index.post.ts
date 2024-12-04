import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
    try {
        const { email, password } = await readBody(event);;
        
        if(!email || !password){
            throw  createError({
                statusCode: 400,
                statusMessage: "Email et MDP requis"
            })
        }
        
        const supabase = await serverSupabaseClient(event);

        if(error){
            throw createError({
                statusCode: 400,
                statusMessage: error.message,
            })
        }

        return {
            message: "Succès creation article",

        };

    } catch (error) {
        console.error("Erreur creation article :", error);
        return createError({
            statusCode: 500,
            statusMessage: "Erreur lors de la creation d'article",
        });
    }
});