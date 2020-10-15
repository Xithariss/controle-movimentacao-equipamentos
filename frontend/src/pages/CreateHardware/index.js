import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Container,
    Row,
    Col,
    Button,
    Alert,
    FormFeedback
} from 'reactstrap';

import api from '../../services/api';
import AuthContext from '../../contexts/auth';

export default function EditHardware() {
    const [types, setTypes] = useState([]);
    const [departments, setDepartments] = useState([]);

    const [heritage, setHeritage] = useState('');
    const [description, setDescription] = useState('');
    const [brand, setBrand] = useState('');
    const [warranty, setWarranty] = useState('');
    const [has_office, setHasOffice] = useState('SEM OFFICE');
    const [auction, setAuction] = useState('true');
    const [date_auction, setDateAuction] = useState(null);
    const [category, setCategory] = useState(1);
    const [belongs, setBelongs] = useState([1, '']);
    const [heritageValid, setHeritageValid] = useState(false);
    const [descriptionValid, setDescriptionValid] = useState(false);
    const [brandValid, setBrandValid] = useState(false);
    const [warrantyValid, setWarrantyValid] = useState(false);
    const [dateAuctionValid, setDateAuctionValid] = useState(false);
    const [visible, setVisible] = useState(false);
    const { message, setMessage } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        async function getAllTypes() {
            const response = await api.get('/types');
            const data = await response.data;

            setTypes(data);
        }

        getAllTypes();
    }, []);

    useEffect(() => {
        async function getAllDepartments() {
            const response = await api.get('/departments');
            const data = await response.data;

            setDepartments(data);
            setBelongs([data[0].id, data[0].boss]);
        }

        getAllDepartments();
    }, []);

    useEffect(() => {
        function verifyMessage() {
            if (message[0] !== '') {
                setVisible(true);
            }
        }

        verifyMessage();
    }, [message]);

    const onDismiss = () => {
        setVisible(false);
    }

    const verifyAllInputsValid = () => {
        if (
            /(\d{2})(-)(\d{4})|(\d{2})(-)(\d{5})/gm.exec(heritage) &&
            /^\S.*/gm.exec(description) &&
            /^\S.*/gm.exec(brand) &&
            /^\S.*/gm.exec(warranty) &&
            auction === 'true' &&
            date_auction !== null &&
            /^\S.*/gm.exec(date_auction)
        ) {
            return true;
        }
        else if (
            /(\d{2})(-)(\d{4})|(\d{2})(-)(\d{5})/gm.exec(heritage) &&
            /^\S.*/gm.exec(description) &&
            /^\S.*/gm.exec(brand) &&
            /^\S.*/gm.exec(warranty) &&
            auction === 'false'
        ) {
            return true;
        }
        return false;
    }

    const handleHeritage = (e) => {
        const verifyHeritage = e.target.value;

        if (/(\d{2})(-)(\d{4})|(\d{2})(-)(\d{5})/gm.exec(verifyHeritage)) {
            setHeritageValid(true);
        }
        else {
            setHeritageValid(false)
        }

        setHeritage(verifyHeritage);
    }
    const handleDescription = (e) => {
        const verifyDescription = e.target.value;

        if (/^\S.*/gm.exec(verifyDescription)) {
            setDescriptionValid(true);
        }
        else {
            setDescriptionValid(false)
        }

        setDescription(verifyDescription);
    }
    const handleBrand = (e) => {
        const verifyBrand = e.target.value;

        if (/^\S.*/gm.exec(verifyBrand)) {
            setBrandValid(true);
        }
        else {
            setBrandValid(false)
        }

        setBrand(verifyBrand);
    }
    const handleWarranty = (e) => {
        const verifyWarranty = e.target.value;

        if (/^\S.*/gm.exec(verifyWarranty)) {
            setWarrantyValid(true);
        }
        else {
            setWarrantyValid(false)
        }

        setWarranty(e.target.value);
    }
    const handleHasOffice = (e) => {
        setHasOffice(e.target.value);
    }
    const handleAuction = (e) => {
        setAuction(e.target.value);
    }
    const handleDateAuction = (e) => {
        const verifyDateAuction = e.target.value;

        if (/^\S.*/gm.exec(verifyDateAuction)) {
            setDateAuctionValid(true);
        }
        else {
            setDateAuctionValid(false)
        }

        setDateAuction(e.target.value);
    }
    const handleCategory = (e) => {
        setCategory(e.target.value);
    }
    const handleBelongs = (e) => {
        setBelongs([e.target.value, e.target.options[e.target.selectedIndex].attributes.name.value]);
    }

    const validateCreation = () => {
        const validation = verifyAllInputsValid();
        if (validation) {
            createHardware();
        }
        else {
            setMessage(["Existem campos não preenchidos corretamente", 400]);
        }
    }

    const createHardware = async () => {
        const type_id = category;
        const department_id = belongs[0];

        const new_data = {
            heritage,
            description,
            brand,
            warranty,
            has_office,
            auction,
            date_auction,
            type_id,
            department_id
        }

        const response = await api.post(`/${type_id}/hardwares/`, new_data);

        if (response.data.status === 200) {
            setMessage(['Equipamento cadastrado com sucesso.', 200]);
            history.goBack();
        }
        else {
            setMessage([response.data.error, response.data.status]);
        }
    };

    return (
        <>
            <Container className="width_30">
                <Alert color={
                    message[1] === 200 ?
                        "success" :
                        "danger"
                }
                    isOpen={visible}
                    toggle={onDismiss}
                >
                    {message[0]}
                </Alert>
            </Container>

            <Container className="center" fluid={true}>
                <Row>
                    <Col>
                        <h2 className="margin_top_bottom_20 text-center">Cadastrar novo equipamento</h2>
                        <Form>
                            <FormGroup>
                                <Label className="margin_top_10" for="labelHeritage">Tombamento</Label>
                                {
                                    heritageValid ?
                                        <>
                                            <Input
                                                type="text"
                                                name="heritage"
                                                id="labelHeritage"
                                                placeholder="Tombamento"
                                                value={heritage}
                                                onChange={handleHeritage}
                                                className="margin_bottom_20"
                                                valid
                                            />
                                            <FormFeedback valid>Tombamento válido</FormFeedback>
                                        </>
                                        :
                                        <>
                                            <Input
                                                type="text"
                                                name="heritage"
                                                id="labelHeritage"
                                                placeholder="Tombamento"
                                                value={heritage}
                                                onChange={handleHeritage}
                                                className="margin_bottom_20"
                                                invalid
                                            />
                                            <FormFeedback>
                                                O campo <strong>TOMBAMENTO</strong> tem que ser no formato <strong>XX-XXXX ou XX-XXXXX.</strong>
                                            </FormFeedback>
                                        </>
                                }

                            </FormGroup>

                            <FormGroup>
                                <Label className="margin_top_10" for="labelCategory">Tipo</Label>
                                <Input
                                    type="select"
                                    name="category"
                                    id="labelCategory"
                                    value={category}
                                    onChange={handleCategory}
                                    className="margin_bottom_20"
                                >
                                    {
                                        types !== undefined && types.length !== 0 ?
                                            types.map(element => {
                                                return (
                                                    <option
                                                        key={element.id}
                                                        value={element.id}
                                                    >{element.name}</option>
                                                );
                                            }) : ''
                                    }
                                </Input>
                            </FormGroup>

                            <FormGroup>
                                <Label className="margin_top_10" for="labelDescription">Descrição</Label>
                                {
                                    descriptionValid ?
                                        <>
                                            <Input
                                                type="text"
                                                name="description"
                                                id="labelDescription"
                                                placeholder="Descrição"
                                                defaultValue={description}
                                                onChange={handleDescription}
                                                className="margin_bottom_20"
                                                valid
                                            />
                                            <FormFeedback valid>Descrição válida</FormFeedback>
                                        </>
                                        :
                                        <>
                                            <Input
                                                type="text"
                                                name="description"
                                                id="labelDescription"
                                                placeholder="Descrição"
                                                defaultValue={description}
                                                onChange={handleDescription}
                                                className="margin_bottom_20"
                                                invalid
                                            />
                                            <FormFeedback>O campo <strong>DESCRIÇÃO</strong> não pode ser vazio.</FormFeedback>
                                        </>
                                }
                            </FormGroup>

                            <FormGroup>
                                <Label className="margin_top_10" for="labelBrand">Marca</Label>
                                {
                                    brandValid ?
                                        <>
                                            <Input
                                                type="text"
                                                name="brand"
                                                id="labelBrand"
                                                placeholder="Marca"
                                                defaultValue={brand}
                                                onChange={handleBrand}
                                                className="margin_bottom_20"
                                                valid
                                            />
                                            <FormFeedback valid>Marca válida</FormFeedback>
                                        </>
                                        :
                                        <>
                                            <Input
                                                type="text"
                                                name="brand"
                                                id="labelBrand"
                                                placeholder="Marca"
                                                defaultValue={brand}
                                                onChange={handleBrand}
                                                className="margin_bottom_20"
                                                invalid
                                            />
                                            <FormFeedback>O campo <strong>MARCA</strong> não pode ser vazio.</FormFeedback>
                                        </>
                                }
                            </FormGroup>

                            <FormGroup>
                                <Label className="margin_top_10" for="labelWarranty">Garantia</Label>
                                {
                                    warrantyValid ?
                                        <>
                                            <Input
                                                type="date"
                                                name="warranty"
                                                id="labelWarranty"
                                                placeholder="Garantia"
                                                defaultValue={warranty}
                                                onChange={handleWarranty}
                                                className="margin_bottom_20"
                                                valid
                                            />
                                            <FormFeedback valid>Data válida.</FormFeedback>
                                        </>
                                        :
                                        <>
                                            <Input
                                                type="date"
                                                name="warranty"
                                                id="labelWarranty"
                                                placeholder="Garantia"
                                                defaultValue={warranty}
                                                onChange={handleWarranty}
                                                className="margin_bottom_20"
                                                invalid
                                            />
                                            <FormFeedback>O campo <strong>GARANTIA</strong> não pode ser vazio.</FormFeedback>
                                        </>
                                }

                            </FormGroup>

                            <FormGroup>
                                {
                                    document.getElementById("labelCategory") !== null ?
                                        document.getElementById("labelCategory")
                                            .options[
                                            document.getElementById("labelCategory").selectedIndex
                                        ] !== null ?
                                            document.getElementById("labelCategory")
                                                .options[
                                                document.getElementById("labelCategory").selectedIndex
                                            ] !== undefined ?
                                                document.getElementById("labelCategory")
                                                    .options[
                                                    document.getElementById("labelCategory").selectedIndex
                                                ].text === 'COMPUTADOR DE MESA' ?
                                                    <>
                                                        <Label className="margin_top_10" for="labelHasOffice">Tem office</Label>
                                                        <Input
                                                            type="text"
                                                            name="has_office"
                                                            id="labelHasOffice"
                                                            placeholder="Tem office?"
                                                            defaultValue={has_office}
                                                            onChange={handleHasOffice}
                                                            className="margin_bottom_20"
                                                        />
                                                    </>
                                                    : ''
                                                : ''
                                            : ''
                                        : ''
                                }
                            </FormGroup>

                            <FormGroup>
                                <Label className="margin_top_10" for="labelAuction">Leilão</Label>
                                <Input
                                    type="select"
                                    name="auction"
                                    id="labelAuction"
                                    value={auction}
                                    onChange={handleAuction}
                                    className="margin_bottom_20"
                                >
                                    <option key={0} value={true}>FOI PARA LEILÃO</option>
                                    <option key={1} value={false}>NÃO FOI PARA LEILÃO</option>
                                </Input>
                            </FormGroup>

                            <FormGroup>
                                {auction === 'true' &&
                                    <>
                                        <Label className="margin_top_10" for="labelDateAuction">Data de saída para leilão</Label>
                                        {
                                            dateAuctionValid ?
                                                <>
                                                    <Input
                                                        type="date"
                                                        name="date_auction"
                                                        id="labelDateAuction"
                                                        placeholder="Data de saída para leilão"
                                                        value={date_auction === null ? '' : date_auction}
                                                        onChange={handleDateAuction}
                                                        className="margin_bottom_20"
                                                        valid
                                                    />
                                                    <FormFeedback>Data válida.</FormFeedback>
                                                </>
                                                :
                                                <>
                                                    <Input
                                                        type="date"
                                                        name="date_auction"
                                                        id="labelDateAuction"
                                                        placeholder="Data de saída para leilão"
                                                        value={date_auction === null ? '' : date_auction}
                                                        onChange={handleDateAuction}
                                                        className="margin_bottom_20"
                                                        invalid
                                                    />
                                                    <FormFeedback>O campo <strong>DATA DE SAÍDA PARA LEILÃO</strong> não pode ser vazio.</FormFeedback>
                                                </>
                                        }

                                    </>
                                }
                            </FormGroup>

                            <FormGroup>
                                <Row>
                                    <Col>
                                        <Label className="margin_top_10" for="labelBelongs">Departamento</Label>
                                        <Input
                                            type="select"
                                            name="belongs"
                                            id="labelBelongs"
                                            value={belongs[0]}
                                            onChange={handleBelongs}
                                            className="margin_bottom_20"
                                        >
                                            {
                                                departments !== undefined && departments.length !== 0 ?
                                                    departments.map(element => {
                                                        return (
                                                            <option
                                                                key={element.id}
                                                                value={element.id}
                                                                name={element.boss}
                                                            >{element.name}</option>
                                                        );
                                                    }) : ''
                                            }
                                        </Input>
                                    </Col>

                                    <Col>
                                        <Label className="margin_top_10" for="labelBoss">Chefe</Label>
                                        <Input
                                            value={belongs[1]}
                                            readOnly
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>

                            <FormGroup>
                                <Row>
                                    <Col className="center margin_top_bottom_20">
                                        <Button
                                            className="
												margin_left_right_20
												bg_color_verde_zimbra
											"
                                            onClick={validateCreation}
                                            disabled={
                                                verifyAllInputsValid() ? false : true
                                            }
                                        >Cadastrar</Button>
                                        <Button
                                            className="margin_left_right_20"
                                            onClick={() => { history.goBack() }}
                                        >Voltar</Button>
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}