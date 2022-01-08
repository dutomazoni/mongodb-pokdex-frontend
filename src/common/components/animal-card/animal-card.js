import { Card, CardActionArea, CardContent, Typography, CardActions } from "@mui/material";

export default function AnimalCard (props) {
    const animal = props.animal
    return (
            <Card aria-hidden={true} style={{width: '80vw', height: "80vh", marginBottom: "2vh", background: "darkgray", borderRadius: "3%", border: "solid 2px black"}}>
                <CardActionArea>
                    <CardActions >
                        <CardContent style={{width: '100%', height: '100%'}}>
                            <div style={{display: "flex", flexDirection: "column"}}>
                                <div style={{ margin: "auto" }}>
                                    <Typography variant="h2" component="h2" >
                                        <img src={animal.img} alt="animal-img" width={200} height={200} style={{ border: "solid 5px black" }} />
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
