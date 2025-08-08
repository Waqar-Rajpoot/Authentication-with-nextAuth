import { DefaultSession } from 'next-auth';
import 'next-auth'

declare module 'next-auth' {

    interface Session{
        user: {
            role: string;
            id: string;
        } & DefaultSession['user']
    }
    interface User{
        role: string;
    }
    
}

