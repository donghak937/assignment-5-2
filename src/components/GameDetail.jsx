import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const GameDetail = () => {
    const { id } = useParams();
    const [game, setGame] = useState(null);

    useEffect(() => {
        fetch(`https://68dde703d7b591b4b78dd59c.mockapi.io/games/${id}`)
            .then(res => res.json())
            .then(data => setGame(data));
    }, [id]);

    if (!game) return <div>로딩중...</div>;

    return (
        <div className="container mt-4">
            <h2>게임 상세 정보</h2>
            <div className="card">
                <div className="card-body">
                    <h3>제목: {game.game_name}</h3>
                    <p>설명: {game.description}</p>
                    <p>만든사람: {game.username}</p>
                    <p>점수: {game.rating}</p>
                    <Link to="/list" className="btn btn-secondary">목록으로 돌아가기</Link>
                </div>
            </div>
        </div>
    );
};

export default GameDetail;
