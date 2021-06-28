import { FormEvent, useState } from "react";
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from "../hooks/useAuth";

import { database } from "../services/firebase"


import IllustrationImg from '../assets/images/illustration.svg';
import LogoImg from '../assets/images/logo.svg';
import LoginImg from '../assets/images/login.svg';

import '../styles/auth.scss';

import { Button } from '../components/Button';

export function NewRoom() {

  const history = useHistory();
  const { user } = useAuth()

  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(e: FormEvent ) {
    e.preventDefault();
    
    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    });

    history.push(`/rooms/${firebaseRoom.key}`);
  }

  return(
    <div id="page-auth">
      <aside>
        <img src={IllustrationImg} alt="Ilustração simbolizando perguntas e repostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={LogoImg} alt="LetMeAsk" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}> 
            <input 
              type="text" 
              placeholder="Nome da sala"
              onChange={e => setNewRoom(e.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              <img src={LoginImg} alt="Botão de Login" />
              Criar sala
            </Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link to="/">clique aqui</Link></p>
        </div>
      </main>
    </div>
  );
}

