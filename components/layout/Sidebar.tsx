import { LayoutGrid, Users, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import BrandLogo from "@/components/ui/brand-logo";

/* Définition des items de navigation */
const navItems = [
  { icon: LayoutGrid, label: "Pipeline", active: true, soon: false },
  { icon: Users, label: "Contacts", active: false, soon: true },
  { icon: Sparkles, label: "Insights", active: false, soon: true },
];

export default function Sidebar() {
  return (
    <aside className="flex flex-col w-60 h-screen shrink-0 bg-surface border-r border-border">

      {/* Logo en haut */}
      <div className="flex items-center h-14 px-4 border-b border-border">
        <BrandLogo />
      </div>

      {/* Navigation principale */}
      <nav className="flex flex-col gap-0.5 px-2 py-3 flex-1">
        {navItems.map(({ icon: Icon, label, active, soon }) => (
          <div
            key={label}
            className={[
              "flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors select-none",
              active
                /* Item actif : fond accent subtil, texte foreground */
                ? "bg-pipe-accent/10 text-foreground font-medium"
                /* Items désactivés : curseur par défaut, texte muted */
                : "text-muted-foreground cursor-default",
            ].join(" ")}
          >
            <Icon
              size={16}
              className={active ? "text-pipe-accent" : "text-muted-foreground"}
            />
            <span className="flex-1">{label}</span>

            {/* Badge "soon" pour les sections non encore disponibles */}
            {soon && (
              <Badge
                variant="secondary"
                className="text-[10px] px-1.5 py-0 h-4 font-normal"
              >
                soon
              </Badge>
            )}
          </div>
        ))}
      </nav>

      {/* Bloc utilisateur en bas */}
      <div className="flex items-center gap-2.5 px-4 py-4 border-t border-border">
        {/* Avatar circulaire avec initiales */}
        <div className="w-7 h-7 rounded-full bg-pipe-accent flex items-center justify-center shrink-0">
          <span className="text-white text-xs font-semibold leading-none select-none">
            NM
          </span>
        </div>

        {/* Nom et titre de l'utilisateur */}
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-medium text-foreground leading-tight truncate">
            Nicolas Masselot
          </span>
          <span className="text-xs text-muted-foreground leading-tight truncate">
            M1 ESCP
          </span>
        </div>
      </div>
    </aside>
  );
}
