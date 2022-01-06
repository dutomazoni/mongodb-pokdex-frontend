import './mainPage.scss'
import {useEffect, useState} from "react";
import axios from "axios";
import {Button, IconButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {api} from "../services/api";
import {AnimalCard} from "../common";
import {AnimalInfoModal} from "../common/components/animal-info-modal";
import {ToastContainer} from "react-toastify";

export default function MainPage() {
    //#region constants
    const [animals, setAnimals] = useState([])
    const [open, setOpen] = useState(false)
    const [load, setLoad] = useState(false)
    const [index, setIndex] = useState(0)
    const [maxIndex, setMaxIndex] = useState(0)


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
                setLoad(!load);
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

    const handleNext = () => {
        setIndex(currCount => currCount + 1)
    };

    const handlePrevious = () => {
        setIndex(currCount => currCount - 1)
    };


    //#endregion functions
    return (
        <div className={"main-page-container"}>
            <ToastContainer autoClose={2000}/>
            {animals.length > 0 ?
                <div className={"main-page"}>
                    <AnimalCard animal={animals[index]}/>
                </div> : ""
            }
            <div style={{display: "flex", marginTop: "1vh", marginBottom: "2vh"}}>
                <div className={"add-animal"}>
                    <IconButton aria-label="add an animal" onClick={() => handleOpen()}>
                        <AddIcon/>
                    </IconButton>
                </div>
                <div className={"previous-animal"}>
                    <IconButton aria-label="add an animal" onClick={handlePrevious} disabled={index === 0}>
                        <ArrowBackIosIcon/>
                    </IconButton>
                </div>
                <div className={"next-animal"}>
                    <IconButton aria-label="add an animal" onClick={handleNext} disabled={index === maxIndex - 1}>
                        <ArrowForwardIosIcon/>
                    </IconButton>
                </div>
            </div>
            {open && <AnimalInfoModal open={open} setOpen={setOpen}/>}
        </div>
    );
}