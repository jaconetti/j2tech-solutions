-- Inserir posts de blog em PT e EN
-- MVP requirement: 3-5 initial blog posts

-- Post 1: Next.js 14 e App Router
INSERT INTO "Post" (title, slug, excerpt, content, featured_image, author, published, created_at, updated_at, category, tags, locale) VALUES
(
  'Como o Next.js 14 Revoluciona o Desenvolvimento Web',
  'nextjs-14-revoluciona-desenvolvimento-web',
  'O Next.js 14 trouxe mudanças significativas que transformam a forma como desenvolvemos aplicações web modernas.',
  '<p>O <strong>Next.js 14</strong> representa um marco importante no desenvolvimento web moderno. Com o novo <strong>App Router</strong>, React Server Components nativos, e melhorias substanciais de performance, esta versão estabelece novos padrões para frameworks React.</p>

<h2>Principais Novidades</h2>

<h3>1. App Router Estável</h3>
<p>O App Router, agora estável, oferece:</p>
<ul>
<li><strong>Layouts aninhados</strong>: Reutilização eficiente de UI</li>
<li><strong>Server Components por padrão</strong>: Menos JavaScript no cliente</li>
<li><strong>Streaming e Suspense</strong>: Carregamento progressivo de conteúdo</li>
<li><strong>Rotas paralelas e intercept</strong>: UX avançada</li>
</ul>

<h3>2. Server Actions</h3>
<p>Mutations do servidor sem APIs explícitas:</p>
<pre><code>async function createPost(formData) {
  "use server"
  await db.post.create({ data: formData })
  revalidatePath("/blog")
}</code></pre>

<h3>3. Turbopack (Beta)</h3>
<p>Novo bundler escrito em Rust:</p>
<ul>
<li>700x mais rápido que Webpack</li>
<li>Hot reload instantâneo</li>
<li>Otimizações avançadas</li>
</ul>

<h2>Por Que Migrar?</h2>

<p><strong>Performance:</strong> Reduza bundle sizes em até 70% com Server Components</p>
<p><strong>SEO:</strong> Renderização server-side otimizada</p>
<p><strong>Developer Experience:</strong> Type-safety completo e melhor debugging</p>

<h2>Conclusão</h2>
<p>Next.js 14 não é apenas uma atualização – é uma reimaginação de como construir aplicações web. Para startups e empresas que buscam velocidade de desenvolvimento sem comprometer qualidade, é a escolha ideal.</p>

<p><em>Quer migrar seu projeto para Next.js 14? <a href="/contact">Entre em contato</a> com nossa equipe.</em></p>',
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop',
  'J2 Tech Team',
  true,
  NOW(),
  NOW(),
  'Development',
  ARRAY['Next.js', 'React', 'Web Development', 'Performance'],
  'pt'
),
(
  'How Next.js 14 Revolutionizes Web Development',
  'nextjs-14-revolutionizes-web-development',
  'Next.js 14 brought significant changes that transform how we develop modern web applications.',
  '<p><strong>Next.js 14</strong> represents an important milestone in modern web development. With the new <strong>App Router</strong>, native React Server Components, and substantial performance improvements, this version sets new standards for React frameworks.</p>

<h2>Key Features</h2>

<h3>1. Stable App Router</h3>
<p>The now-stable App Router offers:</p>
<ul>
<li><strong>Nested layouts</strong>: Efficient UI reuse</li>
<li><strong>Server Components by default</strong>: Less JavaScript on the client</li>
<li><strong>Streaming and Suspense</strong>: Progressive content loading</li>
<li><strong>Parallel and intercepting routes</strong>: Advanced UX</li>
</ul>

<h3>2. Server Actions</h3>
<p>Server mutations without explicit APIs:</p>
<pre><code>async function createPost(formData) {
  "use server"
  await db.post.create({ data: formData })
  revalidatePath("/blog")
}</code></pre>

<h3>3. Turbopack (Beta)</h3>
<p>New bundler written in Rust:</p>
<ul>
<li>700x faster than Webpack</li>
<li>Instant hot reload</li>
<li>Advanced optimizations</li>
</ul>

<h2>Why Migrate?</h2>

<p><strong>Performance:</strong> Reduce bundle sizes by up to 70% with Server Components</p>
<p><strong>SEO:</strong> Optimized server-side rendering</p>
<p><strong>Developer Experience:</strong> Complete type-safety and better debugging</p>

<h2>Conclusion</h2>
<p>Next.js 14 isn''t just an update – it''s a reimagination of how to build web applications. For startups and companies seeking development speed without compromising quality, it''s the ideal choice.</p>

<p><em>Want to migrate your project to Next.js 14? <a href="/contact">Contact</a> our team.</em></p>',
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop',
  'J2 Tech Team',
  true,
  NOW(),
  NOW(),
  'Development',
  ARRAY['Next.js', 'React', 'Web Development', 'Performance'],
  'en'
);

-- Post 2: MVP em 6 Semanas
INSERT INTO "Post" (title, slug, excerpt, content, featured_image, author, published, created_at, updated_at, category, tags, locale) VALUES
(
  'Como Lançar seu MVP em 6 Semanas: Guia Completo',
  'como-lancar-mvp-em-6-semanas',
  'Aprenda a metodologia que usamos para entregar MVPs de alta qualidade em tempo recorde para startups.',
  '<p>Lançar um <strong>MVP (Minimum Viable Product)</strong> rapidamente é crucial para startups. Quanto mais rápido você validar sua ideia com usuários reais, melhor. Mas velocidade não pode comprometer qualidade.</p>

<p>Ao longo de anos desenvolvendo MVPs para startups, refinamos uma metodologia que equilibra velocidade, qualidade e custos. Aqui está nosso processo completo.</p>

<h2>Semana 1-2: Descoberta e Planejamento</h2>

<h3>Workshop de Descoberta (2 dias)</h3>
<ul>
<li><strong>Definição do problema</strong>: Qual dor você resolve?</li>
<li><strong>Persona</strong>: Quem é seu usuário ideal?</li>
<li><strong>Core features</strong>: O que é essencial vs. nice-to-have?</li>
<li><strong>Success metrics</strong>: Como medir sucesso?</li>
</ul>

<h3>Design Sprint (5 dias)</h3>
<ul>
<li>Wireframes de baixa fidelidade</li>
<li>Protótipo navegável no Figma</li>
<li>Design system inicial</li>
<li>Teste de usabilidade com 5 usuários</li>
</ul>

<h2>Semana 3-5: Desenvolvimento</h2>

<h3>Stack Tecnológico</h3>
<p>Usamos tecnologias modernas e bem suportadas:</p>
<ul>
<li><strong>Frontend</strong>: Next.js 14 + TypeScript + Tailwind</li>
<li><strong>Backend</strong>: Next.js API Routes ou Node.js</li>
<li><strong>Database</strong>: PostgreSQL + Prisma ORM</li>
<li><strong>Auth</strong>: NextAuth.js ou Supabase</li>
<li><strong>Deploy</strong>: Vercel ou Railway</li>
</ul>

<h3>Metodologia Ágil</h3>
<ul>
<li>Sprints de 1 semana</li>
<li>Daily standups de 15min</li>
<li>Demos semanais com stakeholders</li>
<li>Continuous deployment</li>
</ul>

<h2>Semana 6: Testes e Lançamento</h2>

<h3>QA Rigoroso</h3>
<ul>
<li>Testes de integração automatizados</li>
<li>Testes manuais end-to-end</li>
<li>Performance audit (Lighthouse > 90)</li>
<li>Security scan</li>
</ul>

<h3>Soft Launch</h3>
<ul>
<li>Beta com primeiros 10-20 usuários</li>
<li>Analytics setup (Google Analytics + Hotjar)</li>
<li>Feedback loops</li>
<li>Ajustes críticos</li>
</ul>

<h2>O Que Não Fazer</h2>

<p><strong>❌ Feature creep:</strong> Não adicione funcionalidades durante o desenvolvimento</p>
<p><strong>❌ Over-engineering:</strong> Não otimize prematuramente</p>
<p><strong>❌ Perfeccionismo:</strong> 80% bem feito é melhor que 100% nunca lançado</p>

<h2>Casos de Sucesso</h2>

<blockquote>
<p>"Lançamos nosso MVP em 5 semanas e conseguimos os primeiros 100 usuários pagantes em 2 meses"</p>
<footer>— Startup de SaaS B2B</footer>
</blockquote>

<h2>Próximos Passos</h2>

<p>Pronto para transformar sua ideia em produto? Nossa equipe está pronta para ajudar.</p>

<p><a href="/calculator">Calcule o orçamento do seu MVP →</a></p>',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop',
  'J2 Tech Team',
  true,
  NOW(),
  NOW(),
  'Startup',
  ARRAY['MVP', 'Startup', 'Product Development', 'Agile'],
  'pt'
),
(
  'How to Launch Your MVP in 6 Weeks: Complete Guide',
  'how-to-launch-mvp-in-6-weeks',
  'Learn the methodology we use to deliver high-quality MVPs in record time for startups.',
  '<p>Launching an <strong>MVP (Minimum Viable Product)</strong> quickly is crucial for startups. The faster you validate your idea with real users, the better. But speed cannot compromise quality.</p>

<p>Over years of developing MVPs for startups, we''ve refined a methodology that balances speed, quality, and costs. Here''s our complete process.</p>

<h2>Week 1-2: Discovery and Planning</h2>

<h3>Discovery Workshop (2 days)</h3>
<ul>
<li><strong>Problem definition</strong>: What pain do you solve?</li>
<li><strong>Persona</strong>: Who is your ideal user?</li>
<li><strong>Core features</strong>: What''s essential vs. nice-to-have?</li>
<li><strong>Success metrics</strong>: How to measure success?</li>
</ul>

<h3>Design Sprint (5 days)</h3>
<ul>
<li>Low-fidelity wireframes</li>
<li>Navigable prototype in Figma</li>
<li>Initial design system</li>
<li>Usability testing with 5 users</li>
</ul>

<h2>Week 3-5: Development</h2>

<h3>Tech Stack</h3>
<p>We use modern and well-supported technologies:</p>
<ul>
<li><strong>Frontend</strong>: Next.js 14 + TypeScript + Tailwind</li>
<li><strong>Backend</strong>: Next.js API Routes or Node.js</li>
<li><strong>Database</strong>: PostgreSQL + Prisma ORM</li>
<li><strong>Auth</strong>: NextAuth.js or Supabase</li>
<li><strong>Deploy</strong>: Vercel or Railway</li>
</ul>

<h3>Agile Methodology</h3>
<ul>
<li>1-week sprints</li>
<li>15min daily standups</li>
<li>Weekly demos with stakeholders</li>
<li>Continuous deployment</li>
</ul>

<h2>Week 6: Testing and Launch</h2>

<h3>Rigorous QA</h3>
<ul>
<li>Automated integration tests</li>
<li>Manual end-to-end tests</li>
<li>Performance audit (Lighthouse > 90)</li>
<li>Security scan</li>
</ul>

<h3>Soft Launch</h3>
<ul>
<li>Beta with first 10-20 users</li>
<li>Analytics setup (Google Analytics + Hotjar)</li>
<li>Feedback loops</li>
<li>Critical adjustments</li>
</ul>

<h2>What Not to Do</h2>

<p><strong>❌ Feature creep:</strong> Don''t add features during development</p>
<p><strong>❌ Over-engineering:</strong> Don''t optimize prematurely</p>
<p><strong>❌ Perfectionism:</strong> 80% done well is better than 100% never launched</p>

<h2>Success Stories</h2>

<blockquote>
<p>"We launched our MVP in 5 weeks and got our first 100 paying users in 2 months"</p>
<footer>— B2B SaaS Startup</footer>
</blockquote>

<h2>Next Steps</h2>

<p>Ready to transform your idea into a product? Our team is ready to help.</p>

<p><a href="/calculator">Calculate your MVP budget →</a></p>',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop',
  'J2 Tech Team',
  true,
  NOW(),
  NOW(),
  'Startup',
  ARRAY['MVP', 'Startup', 'Product Development', 'Agile'],
  'en'
);

-- Post 3: TypeScript Best Practices
INSERT INTO "Post" (title, slug, excerpt, content, featured_image, author, published, created_at, updated_at, category, tags, locale) VALUES
(
  'TypeScript Best Practices para Projetos Escaláveis',
  'typescript-best-practices-projetos-escalaveis',
  'Descubra as práticas essenciais de TypeScript que tornam seus projetos mais robustos, manuteníveis e escaláveis.',
  '<p><strong>TypeScript</strong> transformou o desenvolvimento JavaScript, trazendo type-safety e melhor tooling. Mas usar TypeScript eficientemente requer conhecer suas melhores práticas.</p>

<h2>1. Configure o tsconfig.json Estritamente</h2>

<p>Use o modo strict para pegar erros cedo:</p>

<pre><code>{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}</code></pre>

<h2>2. Prefira Interfaces a Types para Objetos</h2>

<p>Interfaces são extensíveis e performance melhor:</p>

<pre><code>// ✅ Bom
interface User {
  id: string
  name: string
}

interface Admin extends User {
  permissions: string[]
}

// ❌ Evitar para objetos simples
type User = {
  id: string
  name: string
}</code></pre>

<h2>3. Use Utility Types</h2>

<p>TypeScript oferece utility types poderosos:</p>

<pre><code>// Partial - torna todas propriedades opcionais
type UpdateUser = Partial<User>

// Pick - seleciona propriedades
type UserPreview = Pick<User, ''id'' | ''name''>

// Omit - remove propriedades
type UserWithoutEmail = Omit<User, ''email''>

// Record - cria objeto type
type UserMap = Record<string, User></code></pre>

<h2>4. Type Guards para Runtime Safety</h2>

<pre><code>function isUser(obj: unknown): obj is User {
  return (
    typeof obj === ''object'' &&
    obj !== null &&
    ''id'' in obj &&
    ''name'' in obj
  )
}

// Uso
if (isUser(data)) {
  // TypeScript sabe que data é User aqui
  console.log(data.name)
}</code></pre>

<h2>5. Generics para Reusabilidade</h2>

<pre><code>// ❌ Ruim - código duplicado
function findUserById(id: string): User | undefined
function findPostById(id: string): Post | undefined

// ✅ Bom - genérico e reutilizável
function findById<T>(items: T[], id: string): T | undefined {
  return items.find(item => item.id === id)
}

const user = findById<User>(users, ''123'')
const post = findById<Post>(posts, ''456'')</code></pre>

<h2>6. Enum vs Union Types</h2>

<p>Prefira union types para melhor tree-shaking:</p>

<pre><code>// ❌ Enum adiciona runtime code
enum UserRole {
  Admin = ''ADMIN'',
  User = ''USER''
}

// ✅ Union type - zero runtime
type UserRole = ''ADMIN'' | ''USER''

// ✅ Com const enum - compilado
const enum UserRole {
  Admin = ''ADMIN'',
  User = ''USER''
}</code></pre>

<h2>7. Unknown sobre Any</h2>

<pre><code>// ❌ Any desabilita type checking
function process(data: any) {
  return data.value // sem erro, pode crashar
}

// ✅ Unknown força type checking
function process(data: unknown) {
  if (isValidData(data)) {
    return data.value // seguro
  }
}</code></pre>

<h2>Conclusão</h2>

<p>TypeScript bem usado não é apenas sobre types - é sobre criar código mais confiável e manutenível. Essas práticas são essenciais em projetos que escalam.</p>

<p><a href="/contact">Precisa de ajuda com TypeScript? Fale conosco →</a></p>',
  'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&h=600&fit=crop',
  'J2 Tech Team',
  true,
  NOW(),
  NOW(),
  'Development',
  ARRAY['TypeScript', 'Best Practices', 'Code Quality'],
  'pt'
),
(
  'TypeScript Best Practices for Scalable Projects',
  'typescript-best-practices-scalable-projects',
  'Discover the essential TypeScript practices that make your projects more robust, maintainable, and scalable.',
  '<p><strong>TypeScript</strong> has transformed JavaScript development, bringing type-safety and better tooling. But using TypeScript efficiently requires knowing its best practices.</p>

<h2>1. Configure tsconfig.json Strictly</h2>

<p>Use strict mode to catch errors early:</p>

<pre><code>{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}</code></pre>

<h2>2. Prefer Interfaces over Types for Objects</h2>

<p>Interfaces are extensible and perform better:</p>

<pre><code>// ✅ Good
interface User {
  id: string
  name: string
}

interface Admin extends User {
  permissions: string[]
}

// ❌ Avoid for simple objects
type User = {
  id: string
  name: string
}</code></pre>

<h2>3. Use Utility Types</h2>

<p>TypeScript offers powerful utility types:</p>

<pre><code>// Partial - makes all properties optional
type UpdateUser = Partial<User>

// Pick - selects properties
type UserPreview = Pick<User, ''id'' | ''name''>

// Omit - removes properties
type UserWithoutEmail = Omit<User, ''email''>

// Record - creates object type
type UserMap = Record<string, User></code></pre>

<h2>4. Type Guards for Runtime Safety</h2>

<pre><code>function isUser(obj: unknown): obj is User {
  return (
    typeof obj === ''object'' &&
    obj !== null &&
    ''id'' in obj &&
    ''name'' in obj
  )
}

// Usage
if (isUser(data)) {
  // TypeScript knows data is User here
  console.log(data.name)
}</code></pre>

<h2>5. Generics for Reusability</h2>

<pre><code>// ❌ Bad - duplicated code
function findUserById(id: string): User | undefined
function findPostById(id: string): Post | undefined

// ✅ Good - generic and reusable
function findById<T>(items: T[], id: string): T | undefined {
  return items.find(item => item.id === id)
}

const user = findById<User>(users, ''123'')
const post = findById<Post>(posts, ''456'')</code></pre>

<h2>6. Enum vs Union Types</h2>

<p>Prefer union types for better tree-shaking:</p>

<pre><code>// ❌ Enum adds runtime code
enum UserRole {
  Admin = ''ADMIN'',
  User = ''USER''
}

// ✅ Union type - zero runtime
type UserRole = ''ADMIN'' | ''USER''

// ✅ With const enum - compiled
const enum UserRole {
  Admin = ''ADMIN'',
  User = ''USER''
}</code></pre>

<h2>7. Unknown over Any</h2>

<pre><code>// ❌ Any disables type checking
function process(data: any) {
  return data.value // no error, can crash
}

// ✅ Unknown forces type checking
function process(data: unknown) {
  if (isValidData(data)) {
    return data.value // safe
  }
}</code></pre>

<h2>Conclusion</h2>

<p>Well-used TypeScript isn''t just about types - it''s about creating more reliable and maintainable code. These practices are essential in projects that scale.</p>

<p><a href="/contact">Need help with TypeScript? Contact us →</a></p>',
  'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&h=600&fit=crop',
  'J2 Tech Team',
  true,
  NOW(),
  NOW(),
  'Development',
  ARRAY['TypeScript', 'Best Practices', 'Code Quality'],
  'en'
);
