import { Row, } from "react-bootstrap"
import useBebidas from "../hooks/useBebidas"
import Bebida from "./Bebida" 
import ModalNoData from "./ModalNoData"



const ListadoBebidas = () => {


    const { bebidas, dataDrink } = useBebidas()

    return (
        dataDrink ? (
            <Row className="mt-5">
                {bebidas.map(bebida => (
                    <Bebida 
                        key={bebida.idDrink}
                        bebida={bebida}
                    /> 
                ))}
            </Row>
        ) : (
            <ModalNoData />
        )

    )
}

export default ListadoBebidas