import React, {useState} from 'react';
import { Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';


import './styles.css';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';


export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    
    const ongId = localStorage.getItem('ongId');
 
    const history = useHistory(); 
    
    async function handleNewincident(e){
         e.preventDefault();
    
    const data = {
        title,
        description,
        value,
     };
    
    try{
        await api.post('incidents', data, {
            headers: {
                Authorization: ongId,
                } 
            });
                alert('Caso Cadastrado com sucesso');
                history.push('/profile');
        } catch(err){
            alert ('Erro ao cadastrar Caso tente');
        }

    }
    return(
        <div className="new-incident-container">
            <div className="content"> 
            <section>
                <img src={logoImg} alt="Be The Hero"/>
                
                <h1>Cadastro novo caso</h1>
                <p>Faça seu cadastro, entre na plataforma e ajude as pessoas a encontrarem os casos da sua ONG.</p>

                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041"/>
                      Voltar ao home
                </Link>
            </section>
            
            <form>  
                <input 
                    placeholder="Titulo do caso"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <textarea 
                    placeholder="Descrição"
                    alue={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <input 
                    placeholder="Valor em Reais"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />

                <button onClick={handleNewincident} className="button" type="submit">Cadastrar</button>
            </form>
            </div>
        </div>
        );
}