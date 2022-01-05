import {useState} from "react";
import {Button, Fade, InputLabel, Modal, Input} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './animal-info-modal.scss'
import axios from "axios";
import {api} from "../../services/api";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Compress from "react-image-file-resizer";

export const AnimalInfoModal = (props) => {
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
        const reader = new FileReader();
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
                console.log("sucesso")
                toast.success('Created successfully!')
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
                                <InputLabel className={"input-label"} >Image:</InputLabel>
                                <input
                                    type='file'
                                    accept="image/*"
                                    capture="user"
                                    onChange={handleImageChange}
                                />
                                <InputLabel className={"input-label"}>Name:</InputLabel>
                                <Input className={"input-field"} value={name} onChange={e => setName(e.target.value)} variant={"outlined"}/>
                                <InputLabel className={"input-label"}>Species:</InputLabel>
                                <Input className={"input-field"} value={species} onChange={e => setSpecies(e.target.value)} variant={"outlined"}/>
                                <InputLabel className={"input-label"}>Diet:</InputLabel>
                                <Input className={"input-field"} value={diet} onChange={e => setDiet(e.target.value)} variant={"outlined"}/>
                                <InputLabel className={"input-label"}>Description:</InputLabel>
                                <Input className={"input-field"} value={description} onChange={e => setDescription(e.target.value)} variant={"outlined"}/>
                            </div>
                            <div className={"button-container"}>
                                <Button className={"button-content"} variant="contained" disableElevation endIcon={<SaveIcon/>} onClick={() => handleAdd(name, species, diet, description, img)} > Save </Button>
                                <Button className={"button-content"} variant="contained" disableElevation endIcon={<DeleteForeverIcon/>} onClick={handleClose} > Cancel </Button>
                            </div>
                        </form>
                    </div>
                </Fade>
            </Modal>
    )
}
