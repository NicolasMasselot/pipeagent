import Topbar from "@/components/layout/Topbar";
import PipelineBoard from "@/components/pipeline/PipelineBoard";

/* Page principale — vue Pipeline */
export default function HomePage() {
  return (
    <>
      <Topbar title="Pipeline" />
      <PipelineBoard />
    </>
  );
}
