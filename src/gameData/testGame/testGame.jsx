import './Main.scoped.css';
import { pub_name, isAudience } from '../../components/Enterer/Enterer.tsx';
function TestGame(){
    return (
        <div className="TestGame">
            <h1>You Joined gugu zaza</h1>
            <h1>Name: {pub_name}</h1>
            <h1>Role: {isAudience ? "Audience" : "Player"}</h1>
        </div>
    )
}

export default TestGame