import { serverSupabaseClient } from "#supabase/server";
import type { Article } from "~/@types/api";


export default defineEventHandler(async (event) => {
    try {
        const { cover, title, paragraph1, paragraph2, paragraph3, author, lecture_time, weekId, theme, accroche, illustration, date } = await readBody<{ cover: string; title:string; paragraph1:string; paragraph2:string; paragraph3:string; author:string; lecture_time:number; weekId:string; theme:string; accroche:string; illustration:string; date: string }>(event);
        
        if(!cover || !date || !title || !author || !weekId || !theme || !accroche ){
            throw  createError({
                statusCode: 400,
                statusMessage: "Cover, date, title, author, week, theme, accroche requis"
            })
        }
        
        const supabase = await serverSupabaseClient(event);

        const { data, error } = await supabase
            .from('article')
            .insert<Article>({cover: cover, title: title, paragraph1: paragraph1, paragraph2: paragraph2, paragraph3: paragraph3, author: author, lecture_time: lecture_time, week: weekId, theme: theme, accroche: accroche, illustration: illustration, date: date})
            .select()

        if(error){
            throw createError({
                statusCode: 400,
                statusMessage: error.message,
            })
        }

        return {
            message: "Succès creation article",
            article: data
        };

    } catch (error) {
        console.error("Erreur creation article :", error);
        return createError({
            statusCode: 500,
            statusMessage: "Erreur lors de la creation d'article",
        });
    }
});