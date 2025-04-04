import { NextResponse } from "next/server";
import { jwtVerify } from 'jose';


export async function middleware(request) {
    const path = request.nextUrl.pathname;
    const publicRoutes = ['/admin/auth/login', '/auth/login',];
    if (publicRoutes.includes(path)) {
        return NextResponse.next();
    }

    const Token = request.cookies.get('LOGIN_INFO')?.value;
    try {
        if (!Token) {
            const loginPath = path.startsWith('/admin') ? '/admin/auth/login' : '/auth/login';
            return NextResponse.redirect(new URL(loginPath, request.url));
        }
        const SECRET_KEY = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET_KEY);
        const { payload } = await jwtVerify(Token, SECRET_KEY);
        const userIP = request.ip || request.headers.get('x-forwarded-for')?.split(',')[0];
        const userAgent = request.headers.get('user-agent');
        if (payload.IP !== userIP || payload.UserAgent !== userAgent) {
            const response = NextResponse.redirect(new URL('/admin/auth/login', request.url));
            response.cookies.delete('LOGIN_INFO');
            return response;
        }

        if (path.startsWith('/admin') && !payload.Role?.includes('Admin')) {
            return NextResponse.redirect(new URL('/admin/auth/login', request.url));
        }

        return NextResponse.next();

    } catch (error) {
        const loginPath = path.startsWith('/admin') ? '/admin/auth/login' : '/auth/login';
        const response = NextResponse.redirect(new URL(loginPath, request.url));
        response.cookies.delete('LOGIN_INFO');
        return response;
    }
}

export const config = {
    matcher: ['/admin/:path*', '/account/:path*',],
};