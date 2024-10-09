import NextAuth, { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextApiRequest } from 'next';

// Définir une interface personnalisée pour l'utilisateur
interface CustomUser extends User {
  role?: string;
}

// Étendre les types par défaut de NextAuth
declare module 'next-auth' {
  interface Session {
    user: CustomUser;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string;
  }
}

// Simuler un stockage des tentatives de connexion
// Dans une vraie application, utilisez une base de données ou un cache Redis
const loginAttempts: {
  [key: string]: { attempts: number; lockedUntil: number };
} = {};

const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req): Promise<CustomUser | null> {
        const ip =
          ((req as NextApiRequest).headers['x-forwarded-for'] as string) ||
          ((req as NextApiRequest).socket.remoteAddress as string);

        // Vérifier si l'IP est verrouillée
        if (loginAttempts[ip] && loginAttempts[ip].lockedUntil > Date.now()) {
          throw new Error('Trop de tentatives. Réessayez plus tard.');
        }

        if (credentials?.password === process.env.ADMIN_PASSWORD) {
          // Réinitialiser les tentatives en cas de succès
          loginAttempts[ip] = { attempts: 0, lockedUntil: 0 };
          return { id: '1', name: 'Admin', role: 'admin' };
        }

        // Incrémenter les tentatives en cas d'échec
        if (!loginAttempts[ip]) {
          loginAttempts[ip] = { attempts: 0, lockedUntil: 0 };
        }
        loginAttempts[ip].attempts++;

        if (loginAttempts[ip].attempts >= MAX_ATTEMPTS) {
          loginAttempts[ip].lockedUntil = Date.now() + LOCKOUT_TIME;
          throw new Error('Trop de tentatives. Compte verrouillé pendant 15 minutes.');
        }

        throw new Error('Mot de passe incorrect');
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as CustomUser).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin-login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
