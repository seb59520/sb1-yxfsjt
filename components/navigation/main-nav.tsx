'use client';

import * as React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Briefcase,
  Heart,
  Users,
  Calendar,
  Receipt,
  Settings,
  BarChart,
  Home,
  CreditCard,
  Target,
  MapPin,
  Clock,
  Timer,
  Users2,
  Building,
  Trophy,
  CalendarDays,
  Wallet,
  FileText,
  Calculator,
} from 'lucide-react';

const categories = [
  {
    title: 'Tableau de bord',
    icon: Home,
    href: '/',
  },
  {
    title: 'Professionnel',
    icon: Briefcase,
    color: 'text-blue-500 dark:text-blue-400',
    items: [
      {
        title: 'Gestion du temps',
        items: [
          {
            title: 'Pointage',
            description: 'Suivre les heures de travail et les pauses',
            icon: Clock,
            href: '/professional/timesheet',
          },
          {
            title: 'Analyse du temps',
            description: 'Rapports détaillés et statistiques',
            icon: Timer,
            href: '/professional/timesheet/analytics',
          },
        ],
      },
      {
        title: 'Marketing & Finance',
        items: [
          {
            title: 'Calendrier Marketing',
            description: 'Planifier les événements et campagnes',
            icon: Calendar,
            href: '/professional/marketing',
          },
          {
            title: 'Notes de frais',
            description: 'Gérer les dépenses professionnelles',
            icon: Receipt,
            href: '/professional/expenses',
          },
          {
            title: 'Frais kilométriques',
            description: 'Suivre les déplacements professionnels',
            icon: MapPin,
            href: '/professional/mileage',
          },
          {
            title: 'Devis et Facturation',
            description: 'Gérer les devis et factures clients',
            icon: Calculator,
            href: '/professional/billing',
          },
        ],
      },
      {
        title: 'Relations Clients',
        items: [
          {
            title: 'Clients',
            description: 'Gérer les contacts et prospects',
            icon: Users2,
            href: '/professional/clients',
          },
          {
            title: 'Produits',
            description: 'Catalogue de produits et services',
            icon: Building,
            href: '/professional/products',
          },
          {
            title: 'Documents',
            description: 'Gérer les devis et factures',
            icon: FileText,
            href: '/professional/documents',
          },
        ],
      },
      {
        title: 'Abonnements',
        description: 'Gérer les outils et services professionnels',
        icon: CreditCard,
        href: '/professional/subscriptions',
      },
    ],
  },
  {
    title: 'Personnel',
    icon: Heart,
    color: 'text-pink-500 dark:text-pink-400',
    items: [
      {
        title: 'Objectifs',
        description: 'Définir et suivre les objectifs personnels',
        icon: Target,
        href: '/personal/goals',
      },
      {
        title: 'Abonnements',
        description: 'Gérer les abonnements personnels',
        icon: CreditCard,
        href: '/personal/subscriptions',
      },
      {
        title: 'Activités',
        description: 'Planifier les activités personnelles',
        icon: Calendar,
        href: '/personal/activities',
      },
    ],
  },
  {
    title: 'Associatif',
    icon: Users,
    color: 'text-green-500 dark:text-green-400',
    items: [
      {
        title: 'Événements',
        description: 'Organiser des événements communautaires',
        icon: Calendar,
        href: '/associative/events',
      },
      {
        title: 'Membres',
        description: 'Gérer les membres et bénévoles',
        icon: Users2,
        href: '/associative/members',
      },
    ],
  },
  {
    title: 'Paramètres',
    icon: Settings,
    color: 'text-slate-500 dark:text-slate-400',
    items: [
      {
        title: 'Calendrier',
        description: 'Configuration des jours fériés et vacances',
        icon: CalendarDays,
        href: '/settings/calendar',
      },
      {
        title: 'Succès',
        description: 'Voir les récompenses et niveaux',
        icon: Trophy,
        href: '/settings/achievements',
      },
      {
        title: 'Synchronisation',
        description: 'Configurer les intégrations externes',
        icon: Calendar,
        href: '/settings/sync',
      },
      {
        title: 'Facturation',
        description: 'Gérer les paramètres de facturation',
        icon: Wallet,
        href: '/settings/billing',
      },
    ],
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none mb-2">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export function MainNav() {
  const pathname = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {categories.map((category) => {
          const Icon = category.icon;
          
          if (!category.items) {
            return (
              <NavigationMenuItem key={category.title}>
                <Link 
                  href={category.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground",
                    pathname === category.href && "bg-accent text-accent-foreground",
                    category.color
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {category.title}
                </Link>
              </NavigationMenuItem>
            );
          }

          return (
            <NavigationMenuItem key={category.title}>
              <NavigationMenuTrigger 
                className={cn(
                  "flex items-center gap-2",
                  category.color
                )}
              >
                <Icon className="w-4 h-4" />
                {category.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 w-[500px] md:w-[600px] lg:w-[700px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-4">
                    <div className="flex h-full flex-col rounded-md bg-accent p-4">
                      <div className={cn("flex items-center gap-2 mb-2", category.color)}>
                        <Icon className="w-5 h-5" />
                        <span className="text-lg font-medium">{category.title}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Accédez à tous les outils et fonctionnalités de l'espace {category.title.toLowerCase()}.
                      </p>
                      {category.items.map((section, index) => (
                        'items' in section ? (
                          <div key={section.title} className="mb-4 last:mb-0">
                            <h4 className="text-sm font-medium mb-1">{section.title}</h4>
                            <ul className="text-sm text-muted-foreground">
                              {section.items.map((item) => (
                                <li key={item.title} className="mb-1">• {item.title}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null
                      ))}
                    </div>
                  </li>
                  <li className="col-span-1">
                    <ul className="grid grid-cols-1 gap-2">
                      {category.items.flatMap((section) => 
                        'items' in section 
                          ? section.items.map((item) => {
                              const ItemIcon = item.icon;
                              return (
                                <ListItem
                                  key={item.title}
                                  title={item.title}
                                  href={item.href}
                                  className={cn(
                                    pathname === item.href && "bg-accent text-accent-foreground"
                                  )}
                                >
                                  <span className="flex items-center gap-2">
                                    <ItemIcon className="w-4 h-4" />
                                    {item.description}
                                  </span>
                                </ListItem>
                              );
                            })
                          : [
                              <ListItem
                                key={section.title}
                                title={section.title}
                                href={section.href}
                                className={cn(
                                  pathname === section.href && "bg-accent text-accent-foreground"
                                )}
                              >
                                <span className="flex items-center gap-2">
                                  <section.icon className="w-4 h-4" />
                                  {section.description}
                                </span>
                              </ListItem>
                            ]
                      )}
                    </ul>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}