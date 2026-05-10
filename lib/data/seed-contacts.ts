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
          "Databricks est le leader du data lakehouse, valorisé 62 Mds$ après sa série J en décembre 2024. Sa plateforme unifie data engineering, analytics et machine learning sur un même runtime (Delta Lake, MLflow). L'acquisition de MosaicML en 2023, rebaptisé Mosaic AI, a accéléré le virage LLM : Databricks commercialise désormais DBRX et des solutions de fine-tuning souverain auprès des grands comptes européens. La croissance reste soutenue en EMEA, portée notamment par les secteurs public et retail tech.",
        personProfile:
          "Théo Marchetti est Account Executive chez Databricks Paris depuis 18 mois, après deux ans chez Talend. Il couvre un portefeuille mid-market à entreprise et est actif sur LinkedIn, où il publie régulièrement sur les usages data en entreprise. Son profil de chasseur et son activité éditoriale indiquent une ouverture aux profils juniors capables de s'intégrer rapidement dans un cycle de vente technique.",
        pitchAngles: [
          "Chez Investance Partners, j'ai animé quatre sessions de formation sur site pour 40 utilisateurs d'une grande banque et obtenu 4,5/5 de satisfaction. Adapter un discours technique à des interlocuteurs non-experts est au cœur du métier en solutions sales — et c'est quelque chose que j'ai déjà mis en pratique concrètement.",
          "J'ai construit PipeAgent, un CRM agentique déployé en production, en partant de zéro. Ce n'est pas un projet d'école : c'est un outil réel, avec des utilisateurs. Cela montre que je comprends les problématiques des équipes sales tech de l'intérieur, pas seulement en cours.",
          "Mon profil ESCP M1, combiné à une pratique réelle des LLMs (Claude Code, MCPs, PipeAgent en production), est rare pour un junior en sales. Chez Databricks, qui vend de plus en plus de solutions AI à des équipes data, ce double ancrage est directement utile.",
        ],
        questions: [
          "Quelle est la part des deals initiés par des SDRs par rapport à l'inbound dans ton segment mid-market ?",
          "Comment Databricks positionne-t-il DBRX face à OpenAI dans les appels d'offres grands comptes ?",
          "Les stagiaires sales chez Databricks participent-ils aux cycles de vente directement, ou plutôt aux tâches de préparation et d'enablement ?",
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
          subject: "Stage sales tech – M1 ESCP, formateur et builder",
          body: `Bonjour Camille,

Je suis Nicolas Masselot, M1 à ESCP Business School, en recherche d'un stage de six mois en sales tech à partir de juin 2026.

Votre rôle de Solutions Engineer chez HashiCorp m'a particulièrement retenu : vendre Terraform et Vault à des équipes DevOps implique une posture consultative, à la frontière du technique et du commercial, que je cherche à développer.

Mon profil combine formation grande école et pratique réelle des outils tech : j'ai animé des formations pour 40 utilisateurs chez Investance Partners (4,5/5) et construit PipeAgent, un CRM agentique déployé en production. Je suis à l'aise pour dialoguer avec des interlocuteurs techniques comme avec des décideurs business.

Seriez-vous disponible pour un échange de 20 minutes ?

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
          subject: "Stage sales AI – M1 ESCP, utilisateur avancé des LLMs",
          body: `Bonjour Lucas,

Je suis Nicolas Masselot, M1 à ESCP, en recherche d'un stage de six mois en sales tech à partir de juin 2026. Votre rôle de Sales Specialist AI chez Microsoft France m'a retenu : vendre Copilot et Azure OpenAI à des grands comptes implique de naviguer entre décideurs métier et DSI — c'est exactement le type de vente que je cherche à apprendre.

Mon profil est atypique pour un M1 : j'ai construit PipeAgent (CRM agentique en production avec Claude API) et animé des sessions de formation technique pour 40 utilisateurs chez Investance Partners. Je suis capable d'expliquer un modèle de langage à un non-technicien aussi bien qu'à un développeur.

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
          "Snowflake est le leader du data warehousing cloud et amorce un virage vers les workloads AI avec Snowpark et Cortex AI. Après une croissance post-IPO soutenue, la progression se stabilise autour de 30 % par an sur une base ARR significative. La stratégie produit est claire : devenir la couche de données unifiée pour les applications LLM d'entreprise. En EMEA, le bureau parisien a renforcé ses équipes commerciales en 2024. Les cycles de vente, longs de six à douze mois, valorisent les profils capables de construire une relation dans la durée.",
        personProfile:
          "Sofia Bauer est Senior Account Executive chez Snowflake depuis trois ans, après des passages chez Oracle et Salesforce. Elle couvre le segment entreprise avec un portefeuille de grandes organisations. Mentor active, elle a publié récemment sur LinkedIn à propos de l'intégration des profils juniors dans une équipe de vente data — signal direct d'une sensibilité à l'accompagnement des candidats ambitieux.",
        pitchAngles: [
          "Chez Investance Partners, j'ai animé quatre formations sur site pour 40 utilisateurs d'une grande banque et obtenu 4,5/5 de satisfaction. Rendre accessible une technologie complexe à des interlocuteurs non-experts est une compétence centrale en vente data — et je l'ai déjà mise en pratique concrètement.",
          "J'ai développé PipeAgent, un CRM agentique déployé en production, en utilisant les APIs Claude et des workflows agentiques. Ce projet montre que je comprends les cycles de vente de l'intérieur, pas seulement en théorie.",
          "Mon objectif de stage est précisément d'apprendre la vente enterprise longue durée : comment une opportunité Snowflake se structure sur neuf à douze mois, de la découverte au closing. Je cherche à comprendre ce processus étape par étape, pas à traiter du volume.",
        ],
        questions: [
          "Comment Snowflake positionne-t-il Cortex AI face aux offres Databricks et BigQuery dans les appels d'offres ?",
          "Les stagiaires participent-ils aux discovery calls, ou leur rôle est-il plutôt de préparer les réunions en amont ?",
          "Quel profil junior réussit le mieux chez Snowflake — plutôt école de commerce généraliste ou formation à dominante technique ?",
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
          "Mistral AI est le principal acteur européen des grands modèles de langage, valorisé 6 Mds$ après sa série B en juin 2024. La stratégie commerciale repose sur deux axes : l'API self-service pour les développeurs et les déploiements entreprise via La Plateforme, en on-premise ou VPC. En 2025, Mistral accélère son go-to-market avec des partenariats Microsoft Azure, AWS et Snowflake, et monte une équipe commerciale parisienne pour adresser les grands comptes souverains européens. Les recrutements GTM restent rares et très sélectifs.",
        personProfile:
          "Elsa Tournon est Head of GTM chez Mistral AI depuis huit mois, recrutée depuis Dataiku où elle dirigeait les opérations commerciales EMEA. Ancienne Sciences Po et HEC, elle est très active dans l'écosystème French Tech et a récemment participé à un podcast sur la structuration d'une équipe sales dans une startup AI en hypercroissance. C'est un profil décideur qui cherche des stagiaires capables de contribuer à la construction d'un playbook, pas simplement d'exécuter des tâches définies.",
        pitchAngles: [
          "J'utilise les APIs Claude et les MCPs au quotidien et j'ai construit PipeAgent, un CRM agentique déployé en production. Je suis un utilisateur réel des technologies que Mistral vend à ses clients entreprise — ce qui me permet de tenir les deux discours : celui du produit et celui du client.",
          "Chez Investance Partners, j'ai produit un rapport de 25 pages sur les technologies de paiement émergentes et animé des sessions de formation pour 40 utilisateurs. J'ai une appétence naturelle pour la documentation et la structuration d'un discours — exactement ce que demande la construction d'un playbook GTM.",
          "Le positionnement souverain de Mistral est son argument le plus différenciant auprès des institutions publiques et des grands groupes européens réticents à la dépendance cloud américaine. C'est un angle de vente que je comprends et que je serais capable de défendre concrètement.",
        ],
        questions: [
          "Comment Mistral articule-t-il le positionnement open-weight face à l'API commerciale dans les discussions avec des grands comptes soucieux de leur indépendance technique ?",
          "Le stagiaire GTM travaillerait-il principalement sur des sujets outbound, ou aussi sur la structuration interne — playbook, enablement, documentation ?",
          "Quelle est la taille cible des deals entreprise en France — parle-t-on de contrats à 50 000 € ou de deals au-dessus de 500 000 € ?",
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
