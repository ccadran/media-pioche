import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
    try {
        const { weekId } = await readBody<{ weekId: string; }>(event);
        
        if(!weekId){
            throw  createError({
                statusCode: 400,
                statusMessage: "Id requis"
            })
        }
        
        const supabase = await serverSupabaseClient(event);

        const { error: deleteError } = await supabase
            .from('week')
            .delete()
            .eq('id', weekId)

        if(deleteError){
            throw createError({
                statusCode: 400,
                statusMessage: deleteError.message,
            })
        }

        const { data, error: weekError } = await supabase
            .from('week')
            .select("*");
            
        if(weekError){
            throw createError({
                statusCode: 400,
                statusMessage: weekError.message,
            })
        }

        return {
            message: "Succès surpression semaine",
            weeks: data
        };

    } catch (error) {
        console.error("Erreur surpression semaine :", error);
        return createError({
            statusCode: 500,
            statusMessage: "Erreur lors de la surpression de semaine",
        });
    }
});