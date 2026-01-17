# Análise Completa do Problema 404 - i18n com next-intl

## 1. O Problema Atual

**Sintoma:** Erro 404 ao acessar `/pt` mesmo com middleware compilado e rotas geradas no build.

**Causa Raiz Identificada:**
Baseado na análise dos exemplos oficiais do next-intl (github.com/amannn/next-intl), identificamos que nossa estrutura está **INCORRETA**:

### ❌ Nossa Estrutura Atual (ERRADA):
```
app/
  layout.tsx         ← Root layout com <html><body>
  page.tsx           ← Redirect para /pt
  [locale]/
    layout.tsx       ← Locale layout SEM <html><body>
    page.tsx         ← Página home
```

### ✅ Estrutura Correta (Oficial):
```
app/
  layout.tsx         ← Apenas passa children através (sem HTML tags)
  page.tsx           ← Apenas para build estático (opcional)
  [locale]/
    layout.tsx       ← DEVE ter <html><body> completos
    page.tsx         ← Página home
```

## 2. Arquitetura Correta segundo next-intl

### Exemplo Oficial: app/layout.tsx
```tsx
import {ReactNode} from 'react';

// Apenas passa children, NUNCA renderiza <html><body>
export default function RootLayout({children}: {children: ReactNode}) {
  return children;
}
```

### Exemplo Oficial: app/[locale]/layout.tsx
```tsx
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <title>next-intl</title>
      </head>
      <body>
        <NextIntlClientProvider>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

## 3. Arquivos que Precisam ser Atualizados

### 3.1. i18n/routing.ts (Usar defineRouting)
```ts
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['pt', 'en'],
  defaultLocale: 'pt'
});
```

### 3.2. lib/navigation.ts (Passar routing completo)
```ts
import {createNavigation} from 'next-intl/navigation';
import {routing} from '@/i18n/routing';

export const {Link, redirect, usePathname, useRouter} = 
  createNavigation(routing);
```

### 3.3. middleware.ts (Simplificar)
```ts
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
```

### 3.4. app/layout.tsx (Apenas children)
```tsx
import {ReactNode} from 'react';

export default function RootLayout({children}: {children: ReactNode}) {
  return children;
}
```

### 3.5. app/[locale]/layout.tsx (HTML completo)
```tsx
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Scripts, meta tags, etc */}
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <NextIntlClientProvider messages={messages}>
          {/* Estrutura do site */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

## 4. Diferenças Críticas

| Aspecto | Nossa Impl. ERRADA | Impl. Correta |
|---------|-------------------|---------------|
| Root layout | Tem `<html><body>` | Apenas `return children` |
| Locale layout | Só wrapper divs | Tem `<html><body>` completos |
| Scripts/Head | No root layout | No locale layout |
| i18n config | `i18n.ts` com exports | `i18n/routing.ts` com `defineRouting` |
| Navigation | `createNavigation({locales})` | `createNavigation(routing)` |

## 5. Por que Estava Dando 404?

Next.js 14 com App Router espera que **cada rota dinâmica tenha um layout que renderize HTML completo**. 

Quando tínhamos:
- Root layout com `<html><body>`
- Locale layout sem `<html><body>`

O Next.js não conseguia renderizar a página `/pt` porque:
1. Middleware reescreve `/pt` para `/pt`
2. Next.js procura por `app/[locale]/layout.tsx`
3. Encontra mas o layout não retorna HTML válido
4. Resultado: 404 (not found compila)

## 6. Solução Aplicada

✅ Reescrever `app/layout.tsx` para apenas passar children
✅ Mover toda estrutura HTML para `app/[locale]/layout.tsx`
✅ Criar `i18n/routing.ts` com `defineRouting`
✅ Atualizar `lib/navigation.ts` para usar routing completo
✅ Simplificar middleware.ts

## 7. Referências

- [Exemplo oficial app-router](https://github.com/amannn/next-intl/tree/main/examples/example-app-router)
- [Docs: Setup](https://next-intl.dev/docs/routing/setup)
- [Root layout pattern](https://github.com/amannn/next-intl/blob/main/examples/example-app-router/src/app/layout.tsx)
- [Locale layout pattern](https://github.com/amannn/next-intl/blob/main/examples/example-app-router/src/app/%5Blocale%5D/layout.tsx)
