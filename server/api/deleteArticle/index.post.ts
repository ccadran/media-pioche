import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
    try {
        const { articleId, weekId } = await readBody<{ articleId: number; weekId: string }>(event);
        
        if(!articleId || !weekId){
            throw  createError({
                statusCode: 400,
                statusMessage: "Id requis"
            })
        }
        
        const supabase = await serverSupabaseClient(event);

        const { error: deleteError } = await supabase
            .from('article')
            .delete()
            .eq('id', articleId)

        if(deleteError){
            throw createError({
                statusCode: 400,
                statusMessage: deleteError.message,
            })
        }

        const { data, error: articlesError } = await supabase
            .from('article')
            .select("*")
            .eq("week", weekId);
            
        if(articlesError){
            throw createError({
                statusCode: 400,
                statusMessage: articlesError.message,
            })
        }

        return {
            message: "Succès surpression article",
            articles: data
        };

    } catch (error) {
        console.error("Erreur surpression article :", error);
        return createError({
            statusCode: 500,
            statusMessage: "Erreur lors de la surpression de l'article",
        });
    }
});