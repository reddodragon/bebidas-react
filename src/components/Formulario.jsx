
import { useState } from "react"
import { Button, Form, Row, Col, Alert, ButtonGroup, ToggleButton } from "react-bootstrap"
import useCategorias from "../hooks/useCategorias"
import useBebidas from "../hooks/useBebidas"

const Formulario = () => {

    const [searchIngredient, setSearchIngredient] = useState({nombre: ''})
    const [searchCategory, setSearchCategory] = useState({categoria: ''})
    const [alerta, setAlerta] = useState('')

    const { categorias } = useCategorias()
    const { queryDrinksByIngredient, queryDrinksByCategory } = useBebidas()

    const [radioValue, setRadioValue] = useState('1');      
    const radios = [
        { name: 'Buscar por Ingrediente', value: '1' },
        { name: 'Buscar por Categoría', value: '2' },
    
    ];
    
    const handleSubmit = e => {
        e.preventDefault()

        if(radioValue === '1') {
            if(Object.values(searchIngredient).includes('')) {
                setAlerta('The ingredients field is required')
                return
            }
            setAlerta('')
            queryDrinksByIngredient(searchIngredient)
        } else {
            if(Object.values(searchCategory).includes('')) {
                setAlerta('You must choose a category')
                return
            }
            setAlerta('')
            queryDrinksByCategory(searchCategory)
        }
   
    }

  return (
    <>
    <Row className="mb-3">
        <ButtonGroup>
            {radios.map((radio, idx) => (
            <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={idx % 2 ? 'outline-danger' : 'outline-danger'}
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
                {radio.name}
            </ToggleButton>
            ))}
        </ButtonGroup>
    </Row>
    
    <Form
        onSubmit={handleSubmit}
    >
        {alerta && <Alert variant="danger" className="text-center">{alerta}</Alert>}
        <Row>
            <Col md={6}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="nombre">Nombre</Form.Label>

                    <Form.Control
                        id="nombre" 
                        type="text"
                        placeholder="Ex.: Tequila, Vodka, etc"
                        name="nombre"
                        disabled={radioValue === "2" ? true : false}
                        value={searchIngredient.nombre}
                        onChange={e => setSearchIngredient({
                            ...searchIngredient,
                            [e.target.name]: e.target.value
                        })}

                    />
                </Form.Group>
            </Col>
            <Col md={6}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="categoria">Categoría</Form.Label>

                    <Form.Select
                        id="categoria"
                        name="categoria"
                        value={searchCategory.categoria}
                        disabled={radioValue === "1" ? true : false}
                        onChange={e => setSearchCategory({
                            ...searchCategory,
                            [e.target.name] : e.target.value
                        })}

                    >
                        <option>-Choose a Category-</option>
                        {categorias.map(categoria => (
                            <option
                                key={categoria.strCategory}
                                value={categoria.strCategory}
                            >{categoria.strCategory}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Col>
        </Row>

        <Row className="justify-content-end">
            <Col md={3}>
                <Button
                    type="submit"
                    variant='danger'
                    className="text-uppercase w-100"
                >
                    Buscar Bebidas
                </Button>
            </Col>
        </Row>
    </Form>

</>
)}

export default Formulario