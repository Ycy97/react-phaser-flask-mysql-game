import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';
import axios from 'axios';

const PhaserComponent = () => {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    const fetchHighScores = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/scores');
        setHighScores(response.data);
      } catch (error) {
        console.error('Error fetching high scores:', error);
      }
    };

    fetchHighScores();
  }, []);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      scene: {
        preload: preload,
        create: create,
      },
    };

    const game = new Phaser.Game(config);

    function preload() {
      // Preload assets if needed
    }

    function create() {
      // Use highScores state to display scores in the game
      this.add.text(100, 50, `LeaderBoard`, { font: '20px Arial', fill: '#ffffff' });
      highScores.forEach((score, index) => {
        this.add.text(100, 100 + index * 30, `${score.playerName}: ${score.score}`, { font: '20px Arial', fill: '#ffffff' });
      });
    }

    return () => {
      // Cleanup when the component unmounts
      game.destroy(true);
    };
  }, [highScores]);

  return <div id="phaser-container" />;
};

export default PhaserComponent;
