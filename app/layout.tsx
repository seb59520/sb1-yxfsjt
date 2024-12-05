import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';
import { ThemeToggle } from '@/components/theme-toggle';
import { MainNav } from '@/components/navigation/main-nav';
import { TimeClock } from '@/components/time-tracking/time-clock';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Task Management App',
  description: 'Manage your professional, personal, and associative tasks',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background">
            <header className="border-b">
              <div className="container mx-auto px-6 py-3">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-xl font-bold">TaskMaster</h1>
                  <div className="flex items-center space-x-2">
                    <TimeClock />
                    <ThemeToggle />
                  </div>
                </div>
                <MainNav />
              </div>
            </header>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}