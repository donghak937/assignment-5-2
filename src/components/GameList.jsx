import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const GameList = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch('https://68dde703d7b591b4b78dd59c.mockapi.io/games')
            .then(response => response.json())
            .then(data => setGames(data));
    }, []);

    const deleteGame = (id) => {
        if (window.confirm("진짜 삭제할까요?")) {
            fetch(`https://68dde703d7b591b4b78dd59c.mockapi.io/games/${id}`, {
                method: 'DELETE'
            }).then(() => {
                alert("삭제됨!");
                window.location.reload();
            });
        }
    };

    return (
        <div className="container mt-4">
            <h2>게임 목록</h2>
            <Link to="/create" className="btn btn-primary mb-3">게임 추가하기</Link>
            <div className="list-group">
                {games.map(game => (
                    <div key={game.id} className="list-group-item">
                        <h5>{game.game_name}</h5>
                        <p>{game.description}</p>
                        <small>만든사람: {game.username} | 점수: {game.rating}</small>
                        <div className="mt-2">
                            <Link to={`/detail/${game.id}`} className="btn btn-sm btn-info me-2">상세보기</Link>
                            <Link to={`/update/${game.id}`} className="btn btn-sm btn-warning me-2">수정하기</Link>
                            <button onClick={() => deleteGame(game.id)} className="btn btn-sm btn-danger">삭제</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameList;
