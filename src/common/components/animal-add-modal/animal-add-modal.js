import {useState} from "react";
import { Fade, InputLabel, Modal, Input, IconButton} from "@mui/material";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import './animal-add-modal.scss'
import axios from "axios";
import {api} from "../../../services/api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Compress from "react-image-file-resizer";
import {PhotoCamera} from "@mui/icons-material";

export const AnimalAddModal = (props) => {
    //#region constants

    const [name, setName] = useState('');
    const [species, setSpecies] = useState('');
    const [diet, setDiet] = useState('');
    const [img, setImg] = useState(null);
    const [description, setDescription] = useState('');

    //#endregion constants

    //#region functions
    const handleClose = () => props.setOpen(false);
    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        Compress.imageFileResizer(
            file,
            200,
            200,
            "JPEG",
            100,
            0,
            (uri) => {
                setImg(uri)
            },
            "base64" // blob or base64 default base64
        );
    }
    const handleAdd = async (name, species, diet, description, img) => {
        const new_animal = {
            name: name,
            species: species,
            diet: diet,
            description: description,
            img: img,
            created: true
        }
        await addAnimal(new_animal);
        handleClose();
    }
    //#endregion functions

    //#region requests

    const addAnimal =  async (new_animal) => {
        axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
        await api
            .post("/animal", {animal: new_animal} )
            .then((response) => {
                toast.success('Created successfully!')
                props.setLoad(!props.load)
            })
            .catch( (e) => {
                console.log(e)
                toast.error(`${e}`)
            })
    }

    //#endregion requests

    return (
            <Modal
                className={"modal-container"}
                open={props.open}
                onClose={handleClose}>
                <Fade in={props.open}>
                    <div className={"form-container"}>
                        <form style={{margin: "3vw"}}>
                            <div className={"input-container"}>
                                <InputLabel className={"input-label add-img"} ><strong>Image: *</strong>
                                    <Input
                                        style={{display: "none"}}
                                        type='file'
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                        <IconButton aria-label="upload picture" component="span">
                                            <PhotoCamera />
                                        </IconButton>
                                </InputLabel>
                                <InputLabel className={"input-label"}><strong>Name: *</strong></InputLabel>
                                <Input className={"input-field"} value={name} onChange={e => setName(e.target.value)} variant={"outlined"}/>
                                <InputLabel className={"input-label"}><strong>Species: *</strong></InputLabel>
                                <Input className={"input-field"} value={species} onChange={e => setSpecies(e.target.value)} variant={"outlined"}/>
                                <InputLabel className={"input-label"}><strong>Diet: *</strong></InputLabel>
                                <Input className={"input-field"} value={diet} onChange={e => setDiet(e.target.value)} variant={"outlined"}/>
                                <InputLabel className={"input-label"}><strong>Description: *</strong></InputLabel>
                                <Input className={"input-field"} value={description} onChange={e => setDescription(e.target.value)} variant={"outlined"}/>
                            </div>
                            <div className={"button-container"}>
                                <IconButton className={"button-content"} variant="contained" disableElevation onClick={() => handleAdd(name, species, diet, description, img)} >
                                    <CheckOutlinedIcon/>
                                </IconButton>
                                <IconButton className={"button-content"} variant="contained" disableElevation onClick={handleClose}>
                                    <CloseOutlinedIcon/>
                                </IconButton>
                            </div>
                        </form>
                    </div>
                </Fade>
            </Modal>
    )
}
