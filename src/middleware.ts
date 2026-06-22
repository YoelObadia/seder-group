import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    // On restreint au maximum pour que le middleware ne s'exécute QUE sur la racine (/)
    // ou les pages sans locale. Les pages déjà localisées (ex: /fr, /fr/about) 
    // seront servies statiquement sans consommer de CPU Edge sur Vercel.
    matcher: [
        '/',
        '/((?!fr|en|he|_next|_vercel|.*\\..*).*)'
    ]
};
