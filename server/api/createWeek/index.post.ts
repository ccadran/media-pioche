import { serverSupabaseClient } from "#supabase/server";
import type { Week } from "~/@types/api";


export default defineEventHandler(async (event) => {
    try {
        const { cover, date } = await readBody<{ cover: string; date: string }>(event);
        
        if(!cover || !date){
            throw  createError({
                statusCode: 400,
                statusMessage: "Cover et Date requis"
            })
        }
        
        const supabase = await serverSupabaseClient(event);

        const { data, error } = await supabase
            .from('week')
            .insert<Week>({cover: cover, date: date})
            .select()

        if(error){
            throw createError({
                statusCode: 400,
                statusMessage: error.message,
            })
        }

        return {
            message: "Succès creation semaine",
            week: data
        };

    } catch (error) {
        console.error("Erreur creation semaine :", error);
        return createError({
            statusCode: 500,
            statusMessage: "Erreur lors de la creation de semaine",
        });
    }
});