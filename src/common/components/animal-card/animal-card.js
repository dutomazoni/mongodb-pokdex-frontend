import { Card, CardActionArea, CardContent, Typography, CardActions } from "@mui/material";

export default function AnimalCard (props) {
    const animal = props.animal
    return (
            <Card aria-hidden={true} style={{height: "75vh", width: "90vw", margin: "auto", background: "#B1A7A6", borderRadius: "3%", border: "solid 2px black", overflow: "scroll"}}>
                        <CardContent style={{width: '100%', height: '100%'}}>
                            <div style={{display: "flex", flexDirection: "column"}}>
                                <div style={{ margin: "auto" }}>
                                    <Typography variant="h2" component="h2" >
                                        <img src={animal.img} alt="animal-img" width={200} height={200} style={{ border: "solid 5px black" }} />
                                    </Typography>
                                </div>
                                <div style={{  margin: "auto" }}>
                                    <Typography variant="h5" component={"h3"} style={{color: "#161A1D"}}>
                                        <strong> {animal.name} </strong>
                                    </Typography>
                                </div>
                                <div style={{  marginTop: '1vh'}}>
                                    <Typography variant="body1" style={{color: "#161A1D"}}>
                                        Species:<strong> {animal.species} </strong>
                                    </Typography>
                                </div>
                                <div style={{  marginTop: '1vh'}}>
                                    <Typography variant="body1" style={{color: "#161A1D"}}>
                                        Diet:<strong> {animal.diet} </strong>
                                    </Typography>
                                </div>
                                <div style={{ width: "90%",  marginTop: '1vh', textAlign: "justify"}}>
                                    <Typography variant="p" style={{color: "#161A1D"}}>
                                        Description: {animal.description}
                                    </Typography>
                                </div>
                            </div>
                        </CardContent>
            </Card>
    );
}
