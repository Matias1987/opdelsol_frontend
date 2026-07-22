import { id_sf_distrib } from "@/src/config"
import AgregarSubgrupoAGrupo from "./agregarSubgrupoAGrupo"

const AgregarSGAGrupoDistrib = ({subgrupoId, callback}) => {

    return <AgregarSubgrupoAGrupo subgrupoId={subgrupoId} subfamiliaId={88905} onClose={callback} />
}

export default AgregarSGAGrupoDistrib;