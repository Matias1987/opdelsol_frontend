import { id_sf_distrib } from "@/src/config"
import AgregarSubgrupoAGrupo from "./agregarSubgrupoAGrupo"

const AgregarSGAGrupoDistrib = ({subgrupoId, callback}) => {
    return <AgregarSubgrupoAGrupo subgrupoId={subgrupoId} subfamiliaId={id_sf_distrib} onClose={callback} />
}

export default AgregarSGAGrupoDistrib;