import { EntererButton, EntererInput, Form, TermsLabel } from "./styled";
import { FormEvent, useEffect, useState } from "react";
import { textInput } from "../../../../utils/textInput";
import { ws } from "../../../../utils/web";
import { mem } from "../../../../utils/mem";
import { useTranslation } from "react-i18next";

export function EntererForm({notFoundCallout, r, isTwitchLogined = false}: {notFoundCallout:Function, r:string | null, isTwitchLogined:boolean}){
    const [name, setName] = useState<string>(mem.name ?? "");
    const [code, setCode] = useState<string>((r ?? "").slice(0, 4).toUpperCase());
    const [buttonStatus, setButtonStatus] = useState<number>(0);
    const [checkBypass, setBypass] = useState<boolean>(false);
    const { t } = useTranslation();

    const checkIfRoomExists = async () => {
        if(mem.codes[code] !== undefined){
            setBypass(true);
            setButtonStatus(2);
            return;
        }
        if(await ws.findRoom(code)){
            setButtonStatus(1);
            return;
        }
        notFoundCallout(true);
    }

    useEffect(() => {
        setBypass(false);
        notFoundCallout(false);
        setButtonStatus(0);
        if(code.length < 4) return;
        checkIfRoomExists();
    }, [code]);

    const setMemCode = async () => {
        const code = await mem.getLastCode();
        if(code !== ""){
            setBypass(true);
            setCode(code);
        }
    }

    useEffect(() => {
        return () => {
            if(code === "") setMemCode();
        }
    }, [])

    const connect = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        checkBypass ? ws.reconnectToRoom(code, mem.lastToken) : ws.connectToRoom(code);
    }

    return <Form onSubmit={connect}>
        <EntererInput
            type="text"
            data-twitch={isTwitchLogined}
            placeholder={t("name")}
            value={name || ""}
            onChange={
                (e:any) => {
                    setName(
                        textInput.sanitizeName(e.target.value)
                    );
                    mem.name = textInput.sanitizeName(e.target.value);
                }
            }
            maxLength={12}
        />
        <EntererInput 
            type="text"
            placeholder={t("code")}
            value={code || ""}
            onChange={
                (e:any) => setCode(
                    textInput.sanitizeRoomcode(e.target.value).toUpperCase()
                )
            }
            maxLength={4}
        />
        <EntererButton disabled={buttonStatus === 0} type="submit">
            {
                buttonStatus === 2 || checkBypass ? t('rejoin') : t('play')
            }
        </EntererButton>
        {
            false && <TermsLabel>By entering the game, you agree with our <a>Terms Of Service</a>.</TermsLabel> 
        }
    </Form>
}