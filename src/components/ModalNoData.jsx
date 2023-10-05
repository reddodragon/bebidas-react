import { useEffect, useState } from 'react';
import { Modal, Button  } from "react-bootstrap"
import useBebidas from "../hooks/useBebidas"

const ModalNoData = () => {
    
    const [show, setShow] = useState(false);
    const { dataDrink, setDataDrink } = useBebidas()


    useEffect(() => {
        setShow(!dataDrink);
    }, [dataDrink]);

    const handleClose = () => {
        setShow(false);
        setDataDrink(true)
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>No hay bebidas con ese ingrediente</Modal.Title>
            </Modal.Header>
            <Modal.Body>Quizás escribiste mal el ingrediente</Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>

    )
}

export default ModalNoData