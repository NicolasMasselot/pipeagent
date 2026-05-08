/* Composant logo PipeAgent — icône indigo + nom du produit */

interface BrandLogoProps {
  /* Masque le texte "PipeAgent" si true (utile pour les sidebars réduites) */
  iconOnly?: boolean;
  className?: string;
}

export default function BrandLogo({ iconOnly = false, className = "" }: BrandLogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Icône carrée 28×28 avec dégradé indigo */}
      <div
        className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
        style={{
          background: "linear-gradient(135deg, #6366F1 0%, #818CF8 50%, #4F46E5 100%)",
        }}
      >
        {/* Lettre "P" en blanc, centré dans le carré */}
        <span
          className="text-white font-bold text-sm leading-none select-none"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          P
        </span>
      </div>

      {/* Texte du produit — masqué en mode iconOnly */}
      {!iconOnly && (
        <span className="font-semibold tracking-tight text-foreground text-sm">
          PipeAgent
        </span>
      )}
    </div>
  );
}
