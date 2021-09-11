import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const { active:note } = useSelector(state => state.notes);
    const [ formValues, handleInputChange, reset ] = useForm( note );
    const { body, title } = formValues;


    const activeId  = useRef(note.id);

    useEffect(() => {

        if (note.id !== activeId.current){
            reset( note );
            activeId.current = note.id;
        }


    }, [note, reset])

    return (
        <div className='notes__main-content'>
            
            <NotesAppBar />

            <div className='notes__contenet'>
                <input
                    type='text'
                    placeholder='Some awesome title'
                    className='notes__title-input'
                    autoComplete='off'
                    value={ title }
                    onChange={ handleInputChange} 
                />

                <textarea
                    placeholder='What happened today'
                    className='notes__textarea'
                    value = { body }
                    onChange={ handleInputChange} 
                ></textarea>
                {
                    (note.url)
                    && (
                        <div className='notes__image'>
                            <img
                                src='data:image/jpeg;base64,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'
                                alt='imagen'
                            />
                        </div>
                    )
                }
                
            </div>
        </div>
    )
}
