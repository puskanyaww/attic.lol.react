import { ModalButton, ModalWindow, ModalWrapper } from "./styled";

export default function ModalNotification({title, summary, buttonText, closeFN, isReload = false}: {title:string, summary:string, buttonText:string, closeFN:Function, isReload:boolean}){
    return <ModalWrapper>
        <ModalWindow>
            <h1>{title}</h1>
            <p>{summary}</p>
            <ModalButton
                onClick={
                    () => {
                        closeFN(null);
                        if(isReload) window.location.reload();
                    }
                }>
                {buttonText}
            </ModalButton>
        </ModalWindow>
    </ModalWrapper>
}