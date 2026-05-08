import Topbar from "@/components/layout/Topbar";

/* Page principale — affichera la vue Pipeline en V2 */
export default function HomePage() {
  return (
    <>
      <Topbar title="Pipeline" />

      {/* Placeholder centré en attendant la vue Pipeline */}
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground font-mono">
          Pipeline view will go here
        </p>
      </div>
    </>
  );
}
