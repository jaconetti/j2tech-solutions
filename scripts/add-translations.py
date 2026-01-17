import json

# Read existing files
with open('messages/pt.json', 'r', encoding='utf-8') as f:
    pt = json.load(f)

with open('messages/en.json', 'r', encoding='utf-8') as f:
    en = json.load(f)

# Add Portuguese translations
pt['services'] = {
    "title": "Nossos Serviços",
    "subtitle": "Soluções completas de desenvolvimento de software do MVP ao produto escalável",
    "benefits": "Benefícios:",
    "technologies": "Tecnologias:",
    "timeline": "Prazo:",
    "cta_title": "Pronto para começar seu projeto?",
    "cta_subtitle": "Fale com nossos especialistas e receba uma proposta personalizada",
    "contact_button": "Entrar em Contato",
    "calculate_button": "Calcular Orçamento",
    "mvp": {
        "title": "MVP Development",
        "desc": "Desenvolvemos seu Produto Mínimo Viável com as funcionalidades essenciais para validar sua ideia no mercado rapidamente.",
        "price": "A partir de R$ 15.000",
        "timeline": "4-6 semanas",
        "tech": "React, Next.js, Node.js, PostgreSQL",
        "features": [
            "Validação rápida de ideias",
            "Time-to-market reduzido",
            "Custos otimizados",
            "Iteração baseada em feedback"
        ]
    },
    "apps": {
        "title": "Apps Mobile",
        "desc": "Criamos aplicativos mobile nativos para iOS e Android com excelente performance e experiência do usuário.",
        "price": "A partir de R$ 25.000",
        "timeline": "6-12 semanas",
        "tech": "React Native, Flutter, iOS, Android",
        "features": [
            "Design responsivo e intuitivo",
            "Performance otimizada",
            "Integração com APIs",
            "Publicação nas lojas"
        ]
    },
    "saas": {
        "title": "Plataformas SaaS",
        "desc": "Desenvolvemos plataformas SaaS escaláveis com arquitetura robusta e pronta para crescer com seu negócio.",
        "price": "A partir de R$ 40.000",
        "timeline": "8-16 semanas",
        "tech": "Next.js, Node.js, PostgreSQL, AWS",
        "features": [
            "Arquitetura escalável",
            "Multi-tenancy",
            "Sistema de pagamentos",
            "Analytics integrado"
        ]
    },
    "ecommerce": {
        "title": "E-commerce",
        "desc": "Criamos lojas online completas com gestão de produtos, pagamentos integrados e painel administrativo.",
        "price": "A partir de R$ 20.000",
        "timeline": "6-10 semanas",
        "tech": "Next.js, Stripe, Node.js, PostgreSQL",
        "features": [
            "Catálogo de produtos",
            "Carrinho e checkout",
            "Pagamentos integrados",
            "Painel administrativo"
        ]
    },
    "corporate": {
        "title": "Sistemas Corporativos",
        "desc": "Desenvolvemos sistemas corporativos customizados para otimizar processos e aumentar a produtividade da sua empresa.",
        "price": "Sob consulta",
        "timeline": "Definido por projeto",
        "tech": "Tecnologia definida por projeto",
        "features": [
            "Soluções customizadas",
            "Integração com sistemas legados",
            "Automação de processos",
            "Relatórios avançados"
        ]
    }
}

pt['portfolio'] = {
    "title": "Portfólio",
    "subtitle": "Projetos que transformaram negócios e geraram resultados",
    "status_production": "Em Produção",
    "status_beta": "Beta",
    "view_project": "Ver Projeto"
}

pt['process'] = {
    "title": "Nosso Processo",
    "subtitle": "Metodologia ágil e transparente para garantir o sucesso do seu projeto",
    "step": "ETAPA",
    "what_we_do": "O que fazemos:",
    "deliverables": "Entregáveis:",
    "cta_title": "Pronto para começar?",
    "cta_subtitle": "Agende uma reunião de kick-off e vamos começar seu projeto",
    "contact_button": "Entrar em Contato",
    "discovery": {
        "title": "Descoberta",
        "duration": "3-5 dias",
        "description": "Entendemos profundamente seu negócio, objetivos e requisitos do projeto.",
        "activities": [
            "Entendimento do negócio",
            "Definição de requisitos",
            "Mapeamento de jornadas",
            "Análise de concorrentes"
        ],
        "deliverables": [
            "Documento de requisitos",
            "Cronograma detalhado",
            "Proposta técnica"
        ]
    },
    "planning": {
        "title": "Planejamento",
        "duration": "1 semana",
        "description": "Planejamos a arquitetura, design e roadmap de desenvolvimento.",
        "activities": [
            "Arquitetura do sistema",
            "Design de interfaces",
            "Roadmap de desenvolvimento",
            "Setup do projeto"
        ],
        "deliverables": [
            "Protótipos de alta fidelidade",
            "Documentação técnica",
            "Sprint planning"
        ]
    },
    "development": {
        "title": "Desenvolvimento",
        "duration": "2-8 semanas",
        "description": "Desenvolvemos seu produto com sprints ágeis e entregas incrementais.",
        "activities": [
            "Desenvolvimento em sprints",
            "Code reviews",
            "Testes unitários",
            "Demos semanais"
        ],
        "deliverables": [
            "Código versionado",
            "Builds de teste",
            "Documentação técnica"
        ]
    },
    "testing": {
        "title": "Testes",
        "duration": "1 semana",
        "description": "Garantimos a qualidade com testes rigorosos em múltiplos cenários.",
        "activities": [
            "Testes funcionais",
            "Testes de performance",
            "Testes de segurança",
            "Correção de bugs"
        ],
        "deliverables": [
            "Relatório de testes",
            "Produto estável",
            "Documentação atualizada"
        ]
    },
    "launch": {
        "title": "Lançamento",
        "duration": "3-5 dias",
        "description": "Lançamos seu produto no mercado com suporte completo.",
        "activities": [
            "Deploy em produção",
            "Configuração de infraestrutura",
            "Treinamento da equipe",
            "Monitoramento inicial"
        ],
        "deliverables": [
            "Produto em produção",
            "Documentação de uso",
            "Plano de suporte"
        ]
    }
}

pt['contact'] = {
    "title": "Vamos Conversar?",
    "subtitle": "Entre em contato e conte-nos sobre seu projeto",
    "form_title": "Envie sua mensagem",
    "name_label": "Nome",
    "name_placeholder": "Seu nome",
    "email_label": "Email",
    "email_placeholder": "seu@email.com",
    "company_label": "Empresa",
    "company_placeholder": "Sua empresa",
    "project_type_label": "Tipo de Projeto",
    "project_type_placeholder": "Selecione...",
    "project_type_mvp": "MVP",
    "project_type_app": "App Mobile",
    "project_type_saas": "SaaS",
    "project_type_ecommerce": "E-commerce",
    "project_type_corporate": "Sistema Corporativo",
    "project_type_other": "Outro",
    "message_label": "Mensagem",
    "message_placeholder": "Conte-nos sobre seu projeto...",
    "consent_label": "Aceito receber comunicações da J2 Tech Solutions",
    "submit_button": "Enviar Mensagem",
    "submitting": "Enviando...",
    "success_message": "Mensagem enviada com sucesso! Entraremos em contato em breve.",
    "error_message": "Erro ao enviar mensagem. Tente novamente.",
    "info_title": "Informações de Contato",
    "email_title": "Email",
    "location_title": "Localização",
    "location_text": "São Paulo, Brasil",
    "hours_title": "Horário de Atendimento",
    "hours_text": "Segunda a Sexta, 9h - 18h",
    "required": "*"
}

# Add English translations
en['services'] = {
    "title": "Our Services",
    "subtitle": "Complete software development solutions from MVP to scalable product",
    "benefits": "Benefits:",
    "technologies": "Technologies:",
    "timeline": "Timeline:",
    "cta_title": "Ready to start your project?",
    "cta_subtitle": "Talk to our specialists and receive a personalized proposal",
    "contact_button": "Get in Touch",
    "calculate_button": "Calculate Budget",
    "mvp": {
        "title": "MVP Development",
        "desc": "We develop your Minimum Viable Product with essential features to quickly validate your idea in the market.",
        "price": "Starting at $3,000",
        "timeline": "4-6 weeks",
        "tech": "React, Next.js, Node.js, PostgreSQL",
        "features": [
            "Fast idea validation",
            "Reduced time-to-market",
            "Optimized costs",
            "Feedback-based iteration"
        ]
    },
    "apps": {
        "title": "Mobile Apps",
        "desc": "We create native mobile apps for iOS and Android with excellent performance and user experience.",
        "price": "Starting at $5,000",
        "timeline": "6-12 weeks",
        "tech": "React Native, Flutter, iOS, Android",
        "features": [
            "Responsive and intuitive design",
            "Optimized performance",
            "API integration",
            "Store publication"
        ]
    },
    "saas": {
        "title": "SaaS Platforms",
        "desc": "We develop scalable SaaS platforms with robust architecture ready to grow with your business.",
        "price": "Starting at $8,000",
        "timeline": "8-16 weeks",
        "tech": "Next.js, Node.js, PostgreSQL, AWS",
        "features": [
            "Scalable architecture",
            "Multi-tenancy",
            "Payment system",
            "Integrated analytics"
        ]
    },
    "ecommerce": {
        "title": "E-commerce",
        "desc": "We create complete online stores with product management, integrated payments and admin panel.",
        "price": "Starting at $4,000",
        "timeline": "6-10 weeks",
        "tech": "Next.js, Stripe, Node.js, PostgreSQL",
        "features": [
            "Product catalog",
            "Cart and checkout",
            "Integrated payments",
            "Admin panel"
        ]
    },
    "corporate": {
        "title": "Corporate Systems",
        "desc": "We develop custom corporate systems to optimize processes and increase your company's productivity.",
        "price": "On request",
        "timeline": "Defined per project",
        "tech": "Technology defined per project",
        "features": [
            "Custom solutions",
            "Legacy system integration",
            "Process automation",
            "Advanced reports"
        ]
    }
}

en['portfolio'] = {
    "title": "Portfolio",
    "subtitle": "Projects that transformed businesses and generated results",
    "status_production": "In Production",
    "status_beta": "Beta",
    "view_project": "View Project"
}

en['process'] = {
    "title": "Our Process",
    "subtitle": "Agile and transparent methodology to ensure your project's success",
    "step": "STEP",
    "what_we_do": "What we do:",
    "deliverables": "Deliverables:",
    "cta_title": "Ready to start?",
    "cta_subtitle": "Schedule a kick-off meeting and let's start your project",
    "contact_button": "Get in Touch",
    "discovery": {
        "title": "Discovery",
        "duration": "3-5 days",
        "description": "We deeply understand your business, objectives and project requirements.",
        "activities": [
            "Business understanding",
            "Requirements definition",
            "Journey mapping",
            "Competitor analysis"
        ],
        "deliverables": [
            "Requirements document",
            "Detailed timeline",
            "Technical proposal"
        ]
    },
    "planning": {
        "title": "Planning",
        "duration": "1 week",
        "description": "We plan the architecture, design and development roadmap.",
        "activities": [
            "System architecture",
            "Interface design",
            "Development roadmap",
            "Project setup"
        ],
        "deliverables": [
            "High-fidelity prototypes",
            "Technical documentation",
            "Sprint planning"
        ]
    },
    "development": {
        "title": "Development",
        "duration": "2-8 weeks",
        "description": "We develop your product with agile sprints and incremental deliveries.",
        "activities": [
            "Sprint development",
            "Code reviews",
            "Unit tests",
            "Weekly demos"
        ],
        "deliverables": [
            "Versioned code",
            "Test builds",
            "Technical documentation"
        ]
    },
    "testing": {
        "title": "Testing",
        "duration": "1 week",
        "description": "We ensure quality with rigorous testing in multiple scenarios.",
        "activities": [
            "Functional testing",
            "Performance testing",
            "Security testing",
            "Bug fixes"
        ],
        "deliverables": [
            "Test report",
            "Stable product",
            "Updated documentation"
        ]
    },
    "launch": {
        "title": "Launch",
        "duration": "3-5 days",
        "description": "We launch your product to market with full support.",
        "activities": [
            "Production deploy",
            "Infrastructure setup",
            "Team training",
            "Initial monitoring"
        ],
        "deliverables": [
            "Product in production",
            "User documentation",
            "Support plan"
        ]
    }
}

en['contact'] = {
    "title": "Let's Talk?",
    "subtitle": "Get in touch and tell us about your project",
    "form_title": "Send your message",
    "name_label": "Name",
    "name_placeholder": "Your name",
    "email_label": "Email",
    "email_placeholder": "your@email.com",
    "company_label": "Company",
    "company_placeholder": "Your company",
    "project_type_label": "Project Type",
    "project_type_placeholder": "Select...",
    "project_type_mvp": "MVP",
    "project_type_app": "Mobile App",
    "project_type_saas": "SaaS",
    "project_type_ecommerce": "E-commerce",
    "project_type_corporate": "Corporate System",
    "project_type_other": "Other",
    "message_label": "Message",
    "message_placeholder": "Tell us about your project...",
    "consent_label": "I agree to receive communications from J2 Tech Solutions",
    "submit_button": "Send Message",
    "submitting": "Sending...",
    "success_message": "Message sent successfully! We'll get in touch soon.",
    "error_message": "Error sending message. Please try again.",
    "info_title": "Contact Information",
    "email_title": "Email",
    "location_title": "Location",
    "location_text": "São Paulo, Brazil",
    "hours_title": "Business Hours",
    "hours_text": "Monday to Friday, 9am - 6pm",
    "required": "*"
}

# Write updated files
with open('messages/pt.json', 'w', encoding='utf-8') as f:
    json.dump(pt, f, ensure_ascii=False, indent=2)

with open('messages/en.json', 'w', encoding='utf-8') as f:
    json.dump(en, f, ensure_ascii=False, indent=2)

print("✅ Translations added successfully!")
print("- Services: PT + EN")
print("- Portfolio: PT + EN")
print("- Process: PT + EN")
print("- Contact: PT + EN")
