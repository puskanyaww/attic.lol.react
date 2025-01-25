import LodaingIcon from '../LoadingIcon/LoadingIcon';
import './Main.scoped.css';

function PauseModal(){
    return <div className="PauseParent">
        <div className="Paused">
            <p>Пауза <LodaingIcon/></p>
            <span>Падажтие пака игра снимай пауза</span>
        </div>
    </div>
}

export default PauseModal