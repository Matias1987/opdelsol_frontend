import LayoutVentasV2 from "@/components/layout/layout_ventas_v2";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useLoadDraft, useOperationDraft } from "@/src/hooks/useOperationDraft";

const VentaMultipleMinorista = dynamic(
  () =>
    import("@/components/forms/trabajo_multiple/minorista/venta_multiple_minorista"),
  {
    ssr: false,
    loading: () => <div style={{ width: "100px" }}>Espere...</div>,
  },
);

export default function venta_m() {
  const router = useRouter();
  const id = useSearchParams().get("id");
  const { draft, isLoading, isInvalidId } = useLoadDraft(id);
  const { completeOperation } = useOperationDraft();
  if (isLoading) return null;
  return <VentaMultipleMinorista draft={draft} />;
}

venta_m.PageLayout = LayoutVentasV2;
