import React, { useState, useRef, useEffect } from 'react';
import './style.css'
import undefinedSvg from './undefined.svg'
import {name, locale, pub_name, socket, isValidJSON, code} from '../../index.js';

const localization = {
    ru: {
        backLayer: "Задний слой",
        frontLayer: "Передний слой",
        startGame: "Начать игру",
        playersInGame: "{1} из {2} игроков в игре.",
        vote: "Голосуйте",
        original: "оригинал",
        or: "или",
        undo: "назад",
        send: "Отправить",
        logo: "*Клиффбэнгер*"
    },
    en: {
        backLayer: "Back layer",
        frontLayer: "Front layer",
        startGame: "Start game",
        playersInGame: "{1}/{2} players joined.",
        vote: "Vote",
        original: "original",
        or: "or",
        undo: "undo",
        send: "Send",
        logo: "*Cliffbanger*"
    }
}

function req(todo, data){
    try{
    socket.emit('do', {do:todo, param:data});
    }
    catch(error){

    }
}

function loc(key, replacement2, replacement4){
    const ball = localization[locale][key];
    if(Array.isArray(ball)){
        return ball[Math.floor(Math.random() * ball.length)]
    };
    try {
        return ball.replace("{1}", replacement2).replace("{2}", replacement4);
    } catch (error) {
        return ball
    }
}

function CliffSetup(){
    const [jsx, setJSX] = useState(<h1 className='logo'>{loc("logo")}</h1>)
    const [jsxTask, setJSXTask] = useState("waiting")
    useEffect(() => {
        if(!localStorage.getItem('hash') || !isValidJSON(localStorage.getItem('hash'))){
            localStorage.setItem('hash', "{}");
        }
        var hashes = JSON.parse(localStorage.getItem('hash'))
    
        if(typeof hashes !== "object"){
        hashes = {};
        };

        
        socket.emit('requireReconnectTask', {code: code, hash: hashes[code]})

        socket.on('task', (data) => {
            console.log(data)
            const scenes = {
                "lobby": <Lobby isVip={data.title.isVip} title={data.title}/>,
                "waiting": <h1 className='logo'>{loc("logo")}</h1>,
                "voting": <Voting reference={data.title.reference} drawing1={data.title.drawing1} drawing2={data.title.drawing2}/>,
                "drawing": <DrawingCanvas task={data.title.task}/>
            }
            setJSX(scenes[data.taskName]); setJSXTask(data.taskName)
        });

    }, []);

    return <div className={`cliff cliff${jsxTask}`}>
        <h1 className='PubName'>{pub_name}</h1>
    {jsx}
    </div>
}

function Lobby(props){
    const playersJoined = loc("playersInGame", props.title.curr, props.title.max)
    return (
        <>
        <h1 className='logo'>{loc("logo")}</h1>
        <h3>{playersJoined}</h3>
        {
            props.isVip ? <button onClick={() => req("startGame")}>{loc("startGame")}</button> : ""
        }
        </>
    )
}

function Voting(props){
    const undimg = <img src={undefinedSvg}/>
    const reference = props.reference ? props.reference.replace("<svg", '<svg viewBox="0 0 500 600"') : undimg
    const drawing1 = props.drawing1 ? props.drawing1.replace("<svg", '<svg viewBox="0 0 500 600"') : undimg
    const drawing2 = props.drawing2 ? props.drawing2.replace("<svg", '<svg viewBox="0 0 500 600"') : undimg
    useEffect(()=>{
        if(props.drawing1 !== undefined) document.getElementById("drawing1").innerHTML = `${drawing1}`
        if(props.drawing2 !== undefined) document.getElementById("drawing2").innerHTML = `${drawing2}`

    },[])
    return(
        <>
        <h3>{loc("vote")}</h3>
        <div className='cardBlocks'>
            <div className='cardBlock original'>
                <p>{loc("original")}</p>
                {reference}
            </div>
            <div className='cardsBottom'>
                <div onClick={() => req("vote", 0)} id="drawing1" className='cardBlock gameCard'>{undimg}</div>
                <p>{loc("or")}</p>
                <div onClick={() => req("vote", 1)} id="drawing2" className='cardBlock gameCard'>{undimg}</div>
            </div>
        </div>
        </>
    )
}

function DrawingCanvas(props){
    const [isDrawing, setIsDrawing] = useState(false);
    const [brushSize, setBrushSize] = useState(15);
    const [brushColor, setBrushColor] = useState('#ff0000');
    const [pathsLayer1, setPathsLayer1] = useState([]);
    const [pathsLayer2, setPathsLayer2] = useState([]);
    const [currentLayer, setCurrentLayer] = useState(2);
    const [ass, setAss] = useState("")
    const canvasRef = useRef(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        resizeCanvasToFitScreen();
        window.addEventListener('resize', resizeCanvasToFitScreen);
        return () => {
            window.removeEventListener('resize', resizeCanvasToFitScreen);
        };
    }, [pathsLayer1, pathsLayer2]);

    const getCanvasCoords = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = ((event.touches ? event.touches[0].clientX : event.clientX) - rect.left) / scale;
        const y = ((event.touches ? event.touches[0].clientY : event.clientY) - rect.top) / scale;
        return { x, y };
    };
    
    const handleTouchStart = (e) => {
        e.preventDefault();
        handleMouseDown(e.touches[0]);
    };
    
    const handleTouchMove = (e) => {
        e.preventDefault();
        handleMouseMove(e.touches[0]);
    };
    
    const handleTouchEnd = () => {
        handleMouseUp();
    };
    

    const handleMouseDown = (e) => {
        setIsDrawing(true);
        const { x, y } = getCanvasCoords(e);
        const newPath = { points: [{ x, y }], strokeColor: brushColor, strokeWidth: brushSize };
        if (currentLayer === 1) {
            setPathsLayer1(paths => [...paths, newPath]);
        } else {
            setPathsLayer2(paths => [...paths, newPath]);
        }
    };

    const handleMouseMove = (e) => {
        if (!isDrawing) return;
        const { x, y } = getCanvasCoords(e);
        if (currentLayer === 1) {
            setPathsLayer1(paths => {
                const newPaths = [...paths];
                const currentPath = newPaths[newPaths.length - 1];
                currentPath.points.push({ x, y });
                redrawCanvas();
                return newPaths;
            });
        } else {
            setPathsLayer2(paths => {
                const newPaths = [...paths];
                const currentPath = newPaths[newPaths.length - 1];
                currentPath.points.push({ x, y });
                redrawCanvas();
                return newPaths;
            });
        }
    };

    const handleMouseUp = () => {
        if (isDrawing) {
            setIsDrawing(false);
            handleExport();
        }
    };

    const drawPath = (ctx, path) => {
        if (path.points.length < 2) return;
        ctx.beginPath();
        ctx.strokeStyle = path.strokeColor;
        ctx.lineWidth = path.strokeWidth;
        ctx.moveTo(path.points[0].x, path.points[0].y);
        for (let i = 1; i < path.points.length - 1; i++) {
            const midPoint = midPointBtw(path.points[i], path.points[i + 1]);
            ctx.quadraticCurveTo(path.points[i].x, path.points[i].y, midPoint.x, midPoint.y);
        }
        ctx.lineTo(path.points[path.points.length - 1].x, path.points[path.points.length - 1].y);
        ctx.stroke();
    };

    const midPointBtw = (p1, p2) => {
        return {
            x: p1.x + (p2.x - p1.x) / 2,
            y: p1.y + (p2.y - p1.y) / 2
        };
    };

    const redrawCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pathsLayer1.forEach(path => drawPath(ctx, path));
        pathsLayer2.forEach(path => drawPath(ctx, path));
    };

    const originalWidth = 500;
    const originalHeight = 600;

    const resizeCanvasToFitScreen = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const screenWidth = Math.min(window.innerWidth, originalWidth) - 40;
        const screenHeight = Math.min(window.innerHeight, originalHeight) - 40;
        const widthScale = screenWidth / originalWidth;
        const heightScale = screenHeight / originalHeight;
        const newScale = Math.min(widthScale, heightScale);
        setScale(newScale);
        canvas.style.width = `${originalWidth * newScale}px`;
        canvas.style.height = `${originalHeight * newScale}px`;
        redrawCanvas();
    };

    const handleExport = () => {
        const svgNamespace = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNamespace, "svg");
        svg.setAttribute("width", canvasRef.current.width);
        svg.setAttribute("height", canvasRef.current.height);

        [pathsLayer1, pathsLayer2].forEach(layer => {
            layer.forEach(path => {
                const svgPath = document.createElementNS(svgNamespace, "path");
                let d = `M${path.points[0].x},${path.points[0].y} `;
                for (let i = 1; i < path.points.length - 1; i++) {
                    const midPoint = midPointBtw(path.points[i], path.points[i + 1]);
                    d += `Q${path.points[i].x},${path.points[i].y} ${midPoint.x},${midPoint.y} `;
                }
                d += `L${path.points[path.points.length - 1].x},${path.points[path.points.length - 1].y}`;
                svgPath.setAttribute("d", d);
                svgPath.setAttribute("stroke", path.strokeColor);
                svgPath.setAttribute("stroke-width", path.strokeWidth);
                svgPath.setAttribute("fill", "none");
                svg.setAttribute("stroke-linecap", "round");
                svg.setAttribute("stroke-linejoin", "round");
                svg.appendChild(svgPath);
            });
        });

        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svg);
        console.log(svgString)
        setAss(svgString);
        req("svg", svgString)
    };

    const handleImport = (e) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString("asd", "image/svg+xml");
                const importedPaths = [];
                doc.querySelectorAll('path').forEach((path) => {
                    const d = path.getAttribute('d');
                    const strokeColor = path.getAttribute('stroke');
                    const strokeWidth = path.getAttribute('stroke-width');
                    const points = parsePathDAttribute(d);
                    importedPaths.push({
                        points,
                        strokeColor,
                        strokeWidth: parseFloat(strokeWidth),
                    });
                });

                if (currentLayer === 1) {
                    setPathsLayer1([...pathsLayer1, ...importedPaths]);
                } else {
                    setPathsLayer2([...pathsLayer2, ...importedPaths]);
                }
    };

    const parsePathDAttribute = (d) => {
        const commands = d.split(/(?=[LMC])/);
        const points = commands.map(cmd => {
            const coords = cmd.slice(1).trim().split(' ').map(Number);
            return { x: coords[0], y: coords[1] };
        });
        return points;
    };

    const handleBrushSizeChange = (e) => {
        setBrushSize(Math.max(6, Math.min(50, e.target.value)));
    };

    const handleBrushColorChange = (e) => {
        const newColor = e.target.value;
        if (/^#[0-9A-Fa-f]{6}$/.test(newColor)) {
            setBrushColor(newColor);
        }
    };

    const handleUndo = () => {
        if (currentLayer === 1) {
            setPathsLayer1(paths => {
                const newPaths = paths.slice(0, -1);
                redrawCanvas();
                return newPaths;
            });
        } else {
            setPathsLayer2(paths => {
                const newPaths = paths.slice(0, -1);
                redrawCanvas();
                return newPaths;
            });
        }
    };

    const switchLayer = (layer) => {
        setCurrentLayer(layer);
    };

    const download = () => {
        const blob = new Blob([ass], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'ball.svg';
        link.click();
        console.log(ass);
        link.remove();
    }

    var ab;
    if(props.andrbzniv){
        ab = <button onClick={download}>andrbzniv</button>
    }

    

    return (
        <div className='draw'>
        <div className='canvasBlock'>
            {props.task ? <h1 className='task'>{props.task}</h1> : ""}
            <div>
                <button className={currentLayer === 1 ? 'layerButton chosen' : 'layerButton'} onClick={() => switchLayer(1)}>{loc("backLayer")}</button>
                <button className={currentLayer === 2 ? 'layerButton chosen' : 'layerButton'} onClick={() => switchLayer(2)}>{loc("frontLayer")}</button>
            </div>
            <div>
                <input className='range' type="range" value={brushSize} min="6" max="50" onChange={handleBrushSizeChange} />
                <button className='layerButtonUndo' onClick={handleUndo}>{loc("undo")}</button>
            </div>

            <div className='canvasParent'>
            <canvas ref={canvasRef} width="500px" height="600px" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}     onTouchStart={handleTouchStart} 
            onTouchMove={handleTouchMove} 
            onTouchEnd={handleTouchEnd}/>
            </div>
            <div style={{ marginTop: '10px' }}>             
                <input 
                    type="color" 
                    value={brushColor} 
                    onChange={handleBrushColorChange}
                    title="Change Brush Color"
                />
                <div style={{ marginTop: '10px' }}>
                <button className='layerButtonUndo' onClick={() => req("imDone", ass)}>{loc("send")}</button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default CliffSetup;