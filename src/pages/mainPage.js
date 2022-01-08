import './mainPage.scss'
import {useEffect, useState} from "react";
import axios from "axios";
import {CircularProgress, IconButton} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditIcon from '@mui/icons-material/Edit';
import CatchingPokemonTwoToneIcon from '@mui/icons-material/CatchingPokemonTwoTone';
import {api} from "../services/api";
import {AnimalCard} from "../common";
import {AnimalInfoModal} from "../common/components/animal-info-modal";
import {ToastContainer} from "react-toastify";
import {AnimalEditModal} from "../common/components/animal-edit-modal";

export default function MainPage() {
    //#region constants
    const [animals, setAnimals] = useState([])
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [load, setLoad] = useState(false)
    const [index, setIndex] = useState(0)
    const [maxIndex, setMaxIndex] = useState(0)
    const [animate, setAnimate] = useState(0)
    //#endregion constants

    //#region effects

    useEffect(() => {
        loadAnimals();
    }, [])

    useEffect(() => {
        loadAnimals();
    }, [load])

    //#endregion effects

    //#region requests
    async function loadAnimals() {
        axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
        await api
            .get("/all_animals")
            .then((response) => {
                setAnimals(response.data.animals)
                setMaxIndex(response.data.animals.length)
            })
            .catch((e) => {
                return e;
            })

    }

    //#endregion requests

    //#region functions

    const handleOpen = () => {
        setOpen(true);
    };

    const handleOpenEdit = () => {
        setOpenEdit(true);
    };

    const handleNext = () => {
        setIndex(currCount => currCount + 1)
        setAnimate(1)
    };

    const handlePrevious = () => {
        setIndex(currCount => currCount - 1)
        setAnimate(2)
    };


    //#endregion functions
    return (
        <div className={"main-page-container"}>
            {animals.length === 0 && <div className={"loader"}> <CircularProgress style={{ margin: "auto"}}/> </div> }
            <ToastContainer autoClose={2000}/>
            {animals.length > 0 &&
                <div className={"main-page"} animate={animate} onAnimationEnd={() => setAnimate(0)}>
                        <AnimalCard animal={animals[index]}/>
                </div>
            }
            <div style={{display: "flex", marginTop: "1vh", marginBottom: "2vh"}}>
                <div className={"add-animal"}>
                    <IconButton aria-label="add an animal" onClick={() => handleOpen()}>
                        <CatchingPokemonTwoToneIcon/>
                    </IconButton>
                </div>
                <div className={"edit-animal"}>
                    <IconButton aria-label="add an animal" onClick={() => handleOpenEdit()}>
                        <EditIcon/>
                    </IconButton>
                </div>
                <div className={"previous-animal"}>
                    <IconButton onClick={handlePrevious} disabled={index === 0}>
                        <ArrowBackIosIcon/>
                    </IconButton>
                </div>
                <div className={"next-animal"}>
                    <IconButton onClick={handleNext} disabled={index === maxIndex - 1}>
                        <ArrowForwardIosIcon/>
                    </IconButton>
                </div>
            </div>
            {open && <AnimalInfoModal open={open} setOpen={setOpen} load={load} setLoad={setLoad}/>}
            {openEdit && <AnimalEditModal animal={animals[index]} open={openEdit} setOpen={setOpenEdit} load={load} setLoad={setLoad} maxIndex={maxIndex} index={index} setIndex={setIndex}/>}
        </div>
    );
}
