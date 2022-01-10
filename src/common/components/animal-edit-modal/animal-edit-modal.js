import {useState} from "react";
import {Fade, InputLabel, Modal, Input, IconButton, TextField} from "@mui/material";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import './animal-edit-modal.scss'
import axios from "axios";
import {api} from "../../../services/api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Compress from "react-image-file-resizer";
import {PhotoCamera} from "@mui/icons-material";

export const AnimalEditModal = (props) => {
    //#region constants

    const [name, setName] = useState(props.animal.name);
    const [species, setSpecies] = useState(props.animal.species);
    const [diet, setDiet] = useState(props.animal.diet);
    const [img, setImg] = useState(props.animal.img);
    const [description, setDescription] = useState(props.animal.description);

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
    const handleEdit = async (name, species, diet, description, img) => {
        const new_animal = {
            id: props.animal._id,
            name: name,
            species: species,
            diet: diet,
            description: description,
            img: img,
            created: true
        }
        await editAnimal(new_animal);
        handleClose();
    }

    const handleDelete = async () => {
        await deleteAnimal();
        handleClose();
    }
    //#endregion functions

    //#region requests

    const editAnimal =  async (new_animal) => {
        axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
        await api
            .put("/animal/" + new_animal.id, {animal: new_animal} )
            .then((response) => {
                toast.success('Edited successfully!')
                props.setLoad(!props.load)
            })
            .catch( (e) => {
                console.log(e)
                toast.error(`${e}`)
            })
    }

    const deleteAnimal =  async () => {
        axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
        await api
            .delete("/animal/" + props.animal._id)
            .then((response) => {
                toast.success('Deleted successfully!')
                props.setLoad(!props.load)
                if(props.index === props.maxIndex - 1) {
                    props.setIndex(currCount => currCount - 1)
                }else{
                    props.setIndex(currCount => currCount + 1)
                }

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
                                <InputLabel className={ !img ? "input-label error-img" : "input-label add-img"} ><strong>Image:</strong>
                                    <TextField
                                        style={{display: "none"}}
                                        type='file'
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                    <IconButton aria-label="upload picture" component="span" /*className={ !img.length > 0 ? "error-img" : ""}*/>
                                        <PhotoCamera />
                                    </IconButton>
                                </InputLabel>
                                <InputLabel className={"input-label"}><strong>Name:</strong></InputLabel>
                                <TextField variant="standard" className={"input-field"} value={name} onChange={e => setName(e.target.value)} required error={!name.length  > 0}/>
                                <InputLabel className={"input-label"}><strong>Species:</strong></InputLabel>
                                <TextField variant="standard" className={"input-field"} value={species} onChange={e => setSpecies(e.target.value)} required error={!species.length  > 0}/>
                                <InputLabel className={"input-label"}><strong>Diet:</strong></InputLabel>
                                <TextField variant="standard" className={"input-field"} value={diet} onChange={e => setDiet(e.target.value)} required error={!diet.length  > 0}/>
                                <InputLabel className={"input-label"}><strong>Description:</strong></InputLabel>
                                <TextField variant="standard" className={"input-field"} value={description} onChange={e => setDescription(e.target.value)} required error={!description.length  > 0} multiline />
                            </div>
                            <div className={"button-container"}>
                                <IconButton className={"button-content"} variant="contained" disableElevation onClick={() => handleEdit(name, species, diet, description, img)} disabled={ !img || !name.length > 0 || !species.length > 0 || !diet.length > 0 || !description.length > 0} >
                                    <CheckOutlinedIcon/>
                                </IconButton>
                                <IconButton className={"button-content"} variant="contained" disableElevation onClick={handleClose}>
                                    <CloseOutlinedIcon/>
                                </IconButton>
                                <IconButton className={"button-content"} variant="contained" disableElevation onClick={handleDelete}>
                                    <DeleteForeverIcon/>
                                </IconButton>
                            </div>
                        </form>
                    </div>
                </Fade>
            </Modal>
    )
}
