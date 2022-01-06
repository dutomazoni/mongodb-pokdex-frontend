import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Icon } from "@mui/material";
import './animal-card.scss';
import {useState} from "react";

export default function AnimalCard(props) {
    const animal = props.animal
    return (
        <Card aria-hidden={true} style={{width: '80vw', height: "80vh", marginBottom: "2vh"}}>
            <CardActionArea>
                <CardActions style={{ width: "100%", height: "100%" }}>
                    <CardContent>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <div style={{ margin: "auto" }}>
                                <Typography variant="h2" component="h2" >
                                    <img src={animal.img} alt="animal-img" width={200} height={200}  />
                                </Typography>
                            </div>
                            <div style={{  margin: "auto"}}>
                                <Typography variant="h5" component={"h3"}>
                                    <strong> {animal.name} </strong>
                                </Typography>
                            </div>
                            <div style={{  marginTop: '1vh'}}>
                                <Typography variant="body1"  >
                                    Species:<strong> {animal.species} </strong>
                                </Typography>
                            </div>
                            <div style={{  marginTop: '1vh'}}>
                                <Typography variant="body1"  >
                                    Diet:<strong> {animal.diet} </strong>
                                </Typography>
                            </div>
                            <div style={{  marginTop: '1vh', textAlign: "justify"}}>
                                <Typography variant="p" >
                                    Description: {animal.description}
                                </Typography>
                            </div>
                        </div>

                    </CardContent>
                </CardActions>
            </CardActionArea>
        </Card>
    );
}
// const [image, setImage] = useState([])
// const handleImageChange = (event) => {
//     setImage(URL.createObjectURL(event.target.files[0]))
// }
{/*<label>*/}
{/*    <input*/}
{/*        // style={{display: 'none'}}*/}
{/*        type='file'*/}
{/*        accept="image/*"*/}
{/*        capture="user"*/}
{/*        onChange={handleImageChange}*/}
{/*    />*/}
{/*    /!*<Button>Take a pic!</Button>*!/*/}
{/*</label>*/}
{/*<p>{animal.name}</p>*/}
{/*<p>{animal.species}</p>*/}
{/*<p>{animal.diet}</p>*/}
{/*<img src={animal.img} width={200} height={200} alt={"img"}/>*/}
{/*<p>{animal.description}</p>*/}