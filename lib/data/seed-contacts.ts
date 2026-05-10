// Seed démo. Ces contacts sont 100% fictifs et n'ont aucune correspondance avec des personnes réelles.
// Le seed est rechargé via le bouton "Reset pipeline" et lors de la première visite.

import type { Contact } from "@/lib/types/contact";

export function getSeedContacts(): Contact[] {
  const now = new Date().toISOString();

  // Dates d'interaction échelonnées sur les 30 derniers jours
  const d = (daysAgo: number) =>
    new Date(Date.now() - daysAgo * 86_400_000).toISOString();

  return [
    // ─── IDENTIFIÉ ──────────────────────────────────────────────────────────

    {
      id: crypto.randomUUID(),
      firstName: "Théo",
      lastName: "Marchetti",
      role: "Account Executive",
      company: "Databricks",
      companyDomain: "databricks.com",
      stage: "identified",
      score: 62,
      scoreBreakdown: { responseProbability: 58, profileFit: 71, hiringTiming: 57 },
      lastInteraction: d(28),
      createdAt: now,
      research: {
        generatedAt: d(27),
        companyBrief:
          "Databricks est le leader du data lakehouse, valorisé 62 Mds$ post-série J (2024). La plateforme unifie data engineering, analytics et ML sur un même runtime (Delta Lake + MLflow). En 2025, l'acquisition de Mosaic ML a accéléré le virage LLM : Databricks vend désormais DBRX et des solutions de fine-tuning souverain aux grands comptes européens. La croissance ARR est estimée à 50 %+ en EMEA, avec une forte dynamique dans les secteurs finance et public.",
        personProfile:
          "Théo Marchetti est Account Executive chez Databricks Paris depuis 18 mois, après un passage de 2 ans chez Talend. Profil chasseur mid-market/entreprise, terrain couvert principalement BNP, Société Générale et scale-ups fintech. Actif sur LinkedIn, publie sur les usages data en finance — signal d'ouverture aux profils juniors avec bagage finance + tech.",
        pitchAngles: [
          "Mon passage chez Investance Partners m'a confronté aux problématiques de formation sur produits complexes — exactement le terrain où Databricks cherche des profils capables de parler data et finance simultanément.",
          "J'ai développé Carry Regime Compass et PipeAgent (CRM agentique en prod) — ce type de réalisation démontre que je construis des choses concrètes, pas uniquement que j'étudie des cas.",
          "Avec l'accélération EMEA de Databricks, les équipes sales ont besoin de profils juniors capables de monter vite en compétence technique. Mon double profil ESCP + certification API Claude est directement actionnable.",
        ],
        questions: [
          "Quelle est la part des deals initiés par des SDRs vs inbound dans ton segment mid-market ?",
          "Comment Databricks positionne-t-il DBRX face à OpenAI dans les appels d'offres grands comptes ?",
          "Est-ce que l'équipe Paris recrute des stagiaires sales sur les cycles de vente ou plutôt en support enablement ?",
        ],
      },
    },

    {
      id: crypto.randomUUID(),
      firstName: "Camille",
      lastName: "Renard",
      role: "Solutions Engineer",
      company: "HashiCorp",
      companyDomain: "hashicorp.com",
      stage: "identified",
      score: 48,
      scoreBreakdown: { responseProbability: 45, profileFit: 52, hiringTiming: 47 },
      lastInteraction: d(18),
      createdAt: now,
      emails: [
        {
          id: crypto.randomUUID(),
          type: "cold",
          generatedAt: d(17),
          subject: "Stage sales tech – profil ESCP, certifié AMF & Claude API",
          body: `Bonjour Camille,

Je suis Nicolas Masselot, étudiant en M1 à ESCP Business School, en recherche d'un stage de 6 mois en sales tech à partir de juin 2026.

Votre rôle de Solutions Engineer chez HashiCorp m'a particulièrement retenu : la vente de solutions d'infrastructure complexes (Terraform, Vault) à des équipes DevOps suppose exactement le type de posture consultative que je cherche à développer.

Mon parcours mêle finance (Investance Partners, certification AMF) et tech (certifié Building with the Claude API, projet PipeAgent en production). Je suis à l'aise pour parler à des interlocuteurs techniques autant que business.

Seriez-vous disponible pour un échange de 20 minutes la semaine prochaine ?

— Nicolas`,
        },
      ],
    },

    // ─── CONTACTÉ ───────────────────────────────────────────────────────────

    {
      id: crypto.randomUUID(),
      firstName: "Lucas",
      lastName: "Fontaine",
      role: "Sales Specialist AI",
      company: "Microsoft France",
      companyDomain: "microsoft.com",
      stage: "contacted",
      score: 71,
      scoreBreakdown: { responseProbability: 68, profileFit: 77, hiringTiming: 68 },
      lastInteraction: d(5),
      createdAt: now,
      emails: [
        {
          id: crypto.randomUUID(),
          type: "cold",
          generatedAt: d(5),
          subject: "Stage sales AI – M1 ESCP, double profil finance + tech",
          body: `Bonjour Lucas,

Je suis Nicolas Masselot, M1 ESCP, en recherche d'un stage de 6 mois en sales tech (juin 2026). Votre rôle de Sales Specialist AI chez Microsoft France m'a retenu : vendre Copilot et Azure OpenAI à des grands comptes implique de naviguer entre décideurs métier et DSI, ce qui correspond exactement à ce que je veux apprendre.

Mon profil est atypique : certifié AMF, passé par Investance Partners sur des produits complexes, et actif sur les APIs LLM (certification Claude API, PipeAgent en production). Je suis capable d'expliquer un modèle de langage à un DAF autant qu'à un développeur.

Auriez-vous 20 minutes dans les prochains jours ?

— Nicolas`,
        },
      ],
    },

    {
      id: crypto.randomUUID(),
      firstName: "Sofia",
      lastName: "Bauer",
      role: "Senior Account Executive",
      company: "Snowflake",
      companyDomain: "snowflake.com",
      stage: "contacted",
      score: 79,
      scoreBreakdown: { responseProbability: 76, profileFit: 84, hiringTiming: 77 },
      lastInteraction: d(8),
      createdAt: now,
      research: {
        generatedAt: d(8),
        companyBrief:
          "Snowflake est le leader du data warehousing cloud, en pleine bascule vers les workloads AI avec Snowpark et Cortex AI. Après un pic post-IPO, la croissance se stabilise autour de 30 % YoY, mais la stratégie produit est claire : devenir la couche de données unifiée pour les applications LLM d'entreprise. En EMEA, Snowflake accélère les recrutements commerciaux — le bureau parisien a doublé d'effectif en 2024. Les cycles de vente sont longs (6-12 mois), ce qui rend les profils capables de construire une relation sur la durée très précieux.",
        personProfile:
          "Sofia Bauer, Senior AE chez Snowflake depuis 3 ans, couvre le segment entreprise (CAC40 + grandes mutuelles). Passée par Oracle puis Salesforce, experte du cycle de vente data complexe. Mentor active, elle a publié il y a 3 semaines un post LinkedIn sur l'onboarding des juniors en vente data — signal fort d'ouverture à des profils stagiaires ambitieux.",
        pitchAngles: [
          "Certifié AMF et passé par Investance Partners sur la formation de clients institutionnels à des produits complexes, je parle structuré et data — exactement les interlocuteurs de Sofia en banque et assurance.",
          "Heirl est un projet de structuration patrimoniale que j'ai développé depuis zéro, et Carry Regime Compass un outil d'analyse de régimes de carry — preuve que je construis des choses concrètes, pas uniquement que j'étudie des cas.",
          "Le cycle Snowflake est long et relation-driven. Mon objectif est précisément d'apprendre ce type de vente complexe — pas de traiter des volumes, mais de comprendre comment une opportunité enterprise se construit sur 9 mois.",
        ],
        questions: [
          "Comment Snowflake positionne-t-il Cortex AI face aux offres Databricks et BigQuery AI sur les appels d'offres ?",
          "Dans ton équipe, les stagiaires participent-ils aux discovery calls ou c'est plutôt du travail de préparation en amont ?",
          "Quel est le profil type des juniors qui réussissent à Snowflake — plutôt école de commerce généraliste ou formation technique ?",
        ],
      },
    },

    {
      id: crypto.randomUUID(),
      firstName: "Mathieu",
      lastName: "Leroi",
      role: "Cloud Sales Architect",
      company: "AWS EMEA",
      companyDomain: "aws.amazon.com",
      stage: "contacted",
      score: 55,
      scoreBreakdown: { responseProbability: 51, profileFit: 62, hiringTiming: 52 },
      lastInteraction: d(12),
      createdAt: now,
    },

    // ─── EN CONVERSATION ─────────────────────────────────────────────────────

    {
      id: crypto.randomUUID(),
      firstName: "Elsa",
      lastName: "Tournon",
      role: "Head of GTM",
      company: "Mistral AI",
      companyDomain: "mistral.ai",
      stage: "in_conversation",
      score: 87,
      scoreBreakdown: { responseProbability: 85, profileFit: 92, hiringTiming: 84 },
      lastInteraction: d(2),
      createdAt: now,
      research: {
        generatedAt: d(3),
        companyBrief:
          "Mistral AI est le principal acteur européen des LLMs, valorisé 6 Mds$ après sa série B (juin 2024). La stratégie commerciale repose sur deux axes : l'API self-service pour les développeurs, et les deals entreprise via La Plateforme (déploiement on-premise ou VPC). En 2025, Mistral accélère son GTM avec des partenariats Microsoft Azure, AWS et Snowflake, et monte une équipe commerciale parisienne pour couvrir les grands comptes souverains européens (gouvernements, défense, finance). Les recrutements GTM sont rares et très sélectifs.",
        personProfile:
          "Elsa Tournon est Head of GTM chez Mistral AI depuis 8 mois, recrutée depuis Dataiku où elle dirigeait les opérations commerciales EMEA. Ancienne Sciences Po + HEC, très active dans l'écosystème French Tech. Elle a récemment parlé dans un podcast sur la structuration d'une équipe sales dans une startup AI en hypercroissance. Profil décideur qui cherche des stagiaires capables de monter un playbook, pas juste d'exécuter.",
        pitchAngles: [
          "Certifié Building with the Claude API et MCP, j'ai construit PipeAgent (CRM agentique en prod) — je suis un utilisateur actif des APIs LLM, ce qui m'aligne directement avec les cas d'usage que Mistral vend à ses clients entreprise.",
          "Chez Investance Partners, j'ai travaillé sur la structuration de formations pour des clients institutionnels — appétence native pour la documentation et la construction de playbooks, exactement ce que demande un Head of GTM en phase de scaling.",
          "Mistral est le seul acteur européen crédible face à OpenAI sur le souverain. C'est un angle de vente fort dans les grands comptes publics et financiers — terrain que je connais via mes certifications AMF et mon passage chez Investance.",
        ],
        questions: [
          "Comment Mistral articule-t-il le positioning open-weight (Mistral 7B) vs API commerciale dans les discussions avec des grands comptes frileux sur la dépendance vendor ?",
          "Est-ce que le stagiaire GTM travaillerait principalement sur des sujets outbound, ou aussi sur de la structuration interne (playbook, enablement) ?",
          "Quelle est la taille cible des deals entreprise en France — est-ce qu'on parle de contrats 50k€ ou de deals >500k€ ?",
        ],
      },
    },

    {
      id: crypto.randomUUID(),
      firstName: "Priya",
      lastName: "Menon",
      role: "Senior SDR",
      company: "Salesforce",
      companyDomain: "salesforce.com",
      stage: "in_conversation",
      score: 74,
      scoreBreakdown: { responseProbability: 70, profileFit: 79, hiringTiming: 73 },
      lastInteraction: d(1),
      createdAt: now,
    },

    // ─── STAGE ──────────────────────────────────────────────────────────────

    {
      id: crypto.randomUUID(),
      firstName: "Julien",
      lastName: "Paquet",
      role: "Sales Recruiter",
      company: "NVIDIA",
      companyDomain: "nvidia.com",
      stage: "internship",
      score: 38,
      scoreBreakdown: { responseProbability: 35, profileFit: 42, hiringTiming: 37 },
      lastInteraction: d(22),
      createdAt: now,
    },
  ];
}
