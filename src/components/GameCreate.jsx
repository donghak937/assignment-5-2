import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const GameCreate = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [gameName, setGameName] = useState('');
    const [rating, setRating] = useState('');
    const [description, setDescription] = useState('');

    const usernameRef = useRef();
    const gameNameRef = useRef();
    const ratingRef = useRef();
    const descriptionRef = useRef();

    const saveData = () => {
        if (username === '') {
            alert("이름을 입력하세요!");
            usernameRef.current.focus();
            return;
        }
        if (gameName === '') {
            alert("게임 이름을 입력하세요!");
            gameNameRef.current.focus();
            return;
        }
        if (rating === '') {
            alert("점수를 입력하세요!");
            ratingRef.current.focus();
            return;
        }
        if (description === '') {
            alert("설명을 입력하세요!");
            descriptionRef.current.focus();
            return;
        }

        fetch('https://68dde703d7b591b4b78dd59c.mockapi.io/games', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                game_name: gameName,
                rating: rating,
                description: description,
                update_count: 0
            })
        }).then(() => {
            alert("저장 성공!");
            navigate('/list');
        });
    };

    return (
        <div className="container mt-4">
            <h2>게임 추가</h2>

            <div className="mb-3">
                <label>만든사람 이름</label>
                <input
                    type="text" className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    ref={usernameRef}
                />
            </div>

            <div className="mb-3">
                <label>게임 이름</label>
                <input
                    type="text" className="form-control"
                    value={gameName}
                    onChange={(e) => setGameName(e.target.value)}
                    ref={gameNameRef}
                />
            </div>

            <div className="mb-3">
                <label>점수</label>
                <input
                    type="number" className="form-control"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    ref={ratingRef}
                />
            </div>

            <div className="mb-3">
                <label>설명</label>
                <input
                    type="text" className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    ref={descriptionRef}
                />
            </div>

            <button onClick={saveData} className="btn btn-primary">저장하기</button>
        </div>
    );
};

export default GameCreate;
