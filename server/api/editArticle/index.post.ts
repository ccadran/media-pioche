import { serverSupabaseClient } from "#supabase/server";
import type { Article } from "~/@types/api";


export default defineEventHandler(async (event) => {
    try {
        const { cover, title, paragraph1, paragraph2, paragraph3, author, lecture_time, theme, accroche, illustration, date, articleId } = await readBody<{ cover: string; title:string; paragraph1:string; paragraph2:string; paragraph3:string; author:string; lecture_time:number; theme:string; accroche:string; illustration:string; date: string; articleId: number }>(event);
        
        if(!cover || !date || !title || !author || !theme || !accroche || !articleId ){
            throw  createError({
                statusCode: 400,
                statusMessage: "Cover, date, title, author, week, theme, accroche, articlesId requis"
            })
        }
        
        const supabase = await serverSupabaseClient(event);

        const { data, error } = await supabase
            .from('article')
            .update<Article>({cover: cover, title: title, paragraph1: paragraph1, paragraph2: paragraph2, paragraph3: paragraph3, author: author, lecture_time: lecture_time, theme: theme, accroche: accroche, illustration: illustration, date: date})
            .eq('id', articleId)

        if(error){
            throw createError({
                statusCode: 400,
                statusMessage: error.message,
            })
        }

        return {
            message: "Succès edition article",
            article: data
        };

    } catch (error) {
        console.error("Erreur edition article :", error);
        return createError({
            statusCode: 500,
            statusMessage: "Erreur lors de la edition d'article",
        });
    }
});