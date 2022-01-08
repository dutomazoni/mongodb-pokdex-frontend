import { Card, CardActionArea, CardContent, Typography, CardActions } from "@mui/material";
import './animal-card.scss';

export default function AnimalCard (props) {
    const animal = props.animal
    return (
            <Card className={"card"} aria-hidden={true} style={{width: '80vw', height: "80vh", marginBottom: "2vh"}}>
                <CardActionArea>
                    <CardActions >
                        <CardContent style={{width: '100%', height: '100%'}}>
                            <div style={{display: "flex", flexDirection: "column"}}>
                                <div style={{ margin: "auto" }}>
                                    <Typography variant="h2" component="h2" >
                                        <img src={animal.img} alt="animal-img" width={200} height={200}  />
                                    </Typography>
                                </div>
                                <div style={{  margin: "auto" }}>
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
