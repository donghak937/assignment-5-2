import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const GameUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [gameName, setGameName] = useState('');
    const [rating, setRating] = useState('');
    const [description, setDescription] = useState('');

    const [myCount, setMyCount] = useState(0);
    const [globalCount, setGlobalCount] = useState(0);

    const usernameRef = useRef();
    const gameNameRef = useRef();
    const ratingRef = useRef();
    const descriptionRef = useRef();

    useEffect(() => {
        fetch(`https://68dde703d7b591b4b78dd59c.mockapi.io/games/${id}`)
            .then(res => res.json())
            .then(data => {
                setUsername(data.username);
                setGameName(data.game_name);
                setRating(data.rating);
                setDescription(data.description);
                setMyCount(data.update_count || 0);
            });

        fetch('https://68dde703d7b591b4b78dd59c.mockapi.io/games')
            .then(res => res.json())
            .then(data => {
                let total = 0;
                data.forEach(game => {
                    total += (game.update_count || 0);
                });
                setGlobalCount(total);
            });
    }, [id]);

    const updateServer = (u, g, r, d) => {
        const newMyCount = myCount + 1;
        setMyCount(newMyCount);
        setGlobalCount(prev => prev + 1);

        fetch(`https://68dde703d7b591b4b78dd59c.mockapi.io/games/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: u,
                game_name: g,
                rating: r,
                description: d,
                update_count: newMyCount
            })
        });
    };

    const changeUsername = (e) => {
        const newValue = e.target.value;
        setUsername(newValue);
        updateServer(newValue, gameName, rating, description);
    };

    const changeGameName = (e) => {
        const newValue = e.target.value;
        setGameName(newValue);
        updateServer(username, newValue, rating, description);
    };

    const changeRating = (e) => {
        const newValue = e.target.value;
        setRating(newValue);
        updateServer(username, gameName, newValue, description);
    };

    const changeDescription = (e) => {
        const newValue = e.target.value;
        setDescription(newValue);
        updateServer(username, gameName, rating, newValue);
    };

    const finish = () => {
        if (username === '') { alert("이름 비었음!"); usernameRef.current.focus(); return; }
        if (gameName === '') { alert("게임이름 비었음!"); gameNameRef.current.focus(); return; }
        if (rating === '') { alert("점수 비었음!"); ratingRef.current.focus(); return; }
        if (description === '') { alert("설명 비었음!"); descriptionRef.current.focus(); return; }

        navigate('/list');
    };

    return (
        <div className="container mt-4">
            <h2>게임 수정</h2>


            <div className="mb-3">
                <label>만든사람</label>
                <input type="text" className="form-control"
                    value={username} onChange={changeUsername} ref={usernameRef} />
            </div>

            <div className="mb-3">
                <label>게임이름</label>
                <input type="text" className="form-control"
                    value={gameName} onChange={changeGameName} ref={gameNameRef} />
            </div>

            <div className="mb-3">
                <label>점수</label>
                <input type="number" className="form-control"
                    value={rating} onChange={changeRating} ref={ratingRef} />
            </div>

            <div className="mb-3">
                <label>설명</label>
                <input type="text" className="form-control"
                    value={description} onChange={changeDescription} ref={descriptionRef} />
            </div>

            <div>
                <h4>사이트 전체 총 수정 횟수: {globalCount}회</h4>
                <div>(현재 게임 수정 횟수: {myCount}회)</div>
            </div>

            <button onClick={finish} className="btn btn-success">수정 완료 (목록으로)</button>


        </div>
    );
};

export default GameUpdate;
