import './content.scss'
import duck from '../../duck.png'
export default function Content() {
    return (
        <div className={"content-container"}>
            <img className={"content"} src={duck}/>
        </div>

    );
}