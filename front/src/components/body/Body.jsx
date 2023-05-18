import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from './Body.module.css'
import Textarea from '@mui/joy/Textarea';
import Button1 from "../ui/button1/Button1.jsx";
import {getNote, postNote} from "../../services/note.service.js";
import {decryptNote, encryptNote} from "../../services/encrypt.service.js";

const Body = () => {

    const [text, setText] = useState('');
    const [link, setLink] = useState('');
    const [textAreaReadOnly, setTextAreaReadOnly] = useState(false);
    const [buttonText, setButtonText] = useState('Make private note');
    const [buttonHandler, setButtonHandler] = useState('encrypt');
    const textAreaRef = useRef(null);

    const handlers = {
        copy: () => {console.log(link)
            navigator.clipboard.writeText(link);
            setButtonText('Copied!');
        },
        encrypt: () => {
            const data = encryptNote(text);
            postNote(data.encryptedText).then((res) => {
                const currentHost = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
                const link = `${currentHost}/#/${res.id}:${data.key}`;
                setLink(link);
                setText(`Your private note link:\n ${link}`);
                setTextAreaReadOnly(true);
                setButtonText('Copy link');
                setButtonHandler('copy');
            })
        },
        newNoteFromCurrent: () => {
            setButtonHandler('encrypt');
            setLink('');
            setButtonText('Make private note');
            setTextAreaReadOnly(false);
            history.pushState("", document.title, window.location.pathname + window.location.search);
            textAreaRef.current.focus();
        },
    }

    useEffect(() => {
        let hash = window.location.hash
        if (hash) {
            hash = hash.replace('#/', '').split(':');
            const id = hash[0];
            const key = hash[1];
            getNote(id, key).then(note => {
                const decryptedText = decryptNote(note, key);
                if(!decryptedText) {
                    alert('--== Your link is broken == -- ');
                    history.pushState("", document.title, window.location.pathname + window.location.search);
                    textAreaRef.current.focus();
                    return;
                }

                setTextAreaReadOnly(true);
                setText(decryptedText);
                setButtonHandler('newNoteFromCurrent');
                setButtonText('Make new note from that');
            });
        }
    }, [])


    return (
        <main style={{display: 'flex'}}>
            <div className={styles.bodyBlock}>
                <Textarea
                    placeholder="Type your private note here..."
                    maxRows={1}
                    variant="outlined"
                    value={text}
                    readOnly={textAreaReadOnly}
                    onChange={(e) => setText(e.target.value)}
                    ref={textAreaRef}
                />
                <Button1
                    style={{margin: '5px 0px 0px'}}
                    onClick={handlers[buttonHandler]}
                >{buttonText}</Button1>
            </div>
        </main>
    );
};

export default Body;
