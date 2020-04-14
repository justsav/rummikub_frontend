import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import '../../src/home.css'
import vid from '../static/rm.mp4'
import logo from '../static/logo.svg'
import ico1 from '../static/icon_new_game.png'
import ico2 from '../static/icon_invite_friends.png'
import ico3 from '../static/icon_play_win.png'
import lap from '../static/laptop.png'
import joker from '../static/joker_home.png'
import bz from '../static/bz.jpeg'
import km from '../static/km.jpeg'
import sb from '../static/sb.jpeg'
import js from '../static/js.jpeg'
import Rules from './Rules'
import poster from '../static/poster.jpg'

const Home = () => {
  const [show, setShow] = useState(false)
 
  return (
      <div id="body">
        <header>
          <div className="overlay">
          </div>
            <video poster={poster} playsInline autoPlay muted loop>
              <source src={vid} type="video/mp4"/>
            </video>

          <div className="container" id="top-container">
          <div className="row" id="logo-header">
            <img src={logo} alt='tile game logo' width="500" />
          </div>
            <div className="row play-button" id="masthead-elements"> 
              <div className='col-10'>
              <h1>Take Comfort in the Classics</h1>
              <h3>RummiKlub brings you the world's favorite tabletop tile game, enhanced to reconnect you with friends and family for hours of gaming fun.</h3>
              <Link to="/lobby">
              <button type="button" className="btn btn-primary">PLAY NOW</button>
              </Link>
              <h2 id='device-warn'>We're sorry, Rummiklub is not available to play on mobile or tablet sized screens at this time.</h2>
            </div>
            </div>
          </div>

        </header>
            <div className="container" id="stepbox-container">
              <div className='row'>
              <div className="card col-4 stepbox">
                <div className="stepbox-title">
                  <h2>Create Game</h2>
                </div>
                <div className="stepbox-detail">
                  <div className="col stepbox-icon1">
                    <img src={ico1} alt='create game icon' width="80" />
                  </div>
                  <div className="col stepbox-desc">
                    <p>Enter the game lobby and create a game of 2-4 players, or join existing games.</p>
                  </div>
                </div>
              </div>
              <div className="card col-4 stepbox">
                <div className="stepbox-title">
                  <h2>Invite Friends</h2>
                </div>
                <div className="stepbox-detail">
                  <div className="col stepbox-icon2">
                    <img src={ico2} alt='invite friends icon' width="100"/>
                  </div>
                  <div className="col stepbox-desc">
                    <p>Easily connect with friends and family to have them join you at the virtual table.</p>
                  </div>
                </div>
              </div>
              <div className="card col-4 stepbox">
                <div className="stepbox-title">
                  <h2>Play & Win</h2>
                </div>
                <div className="stepbox-detail">
                  <div className="col stepbox-icon3">
                    <img src={ico3} alt='play win icon' width="90" />
                  </div>
                  <div className="col stepbox-desc">
                    <p>The fun begins! Put your tile game skills to the test and become a RummiKlub champion.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card" id="gameview-container">
            <div className="row">
              <div className="col-5" id="gameview-img">
                <img src={lap} alt='laptop gameplay demo' />
              </div>
              <div className="col-7 play-button" id="gameview-detail">
                <h1>It's Your Turn: Join the Klub</h1>
                <p>It's really no surprise that Rummikub is so popular - it has all the elements that make a great game: it's easy to learn and fast moving, it's different every time it's played, it combines luck and strategy, and it changes quickly so every player has a chance to win until the very end!</p>
                <Link to="/lobby">
                  <button type="button" className="btn btn-primary">PLAY NOW</button>
                </Link>
              </div>
              </div>
            </div>
          
          </div>

          <div className="row" id="belt">
            <div className="container home-rules">
            <img src={joker} alt='' width="60" />
            <h3>Been awhile since you played, or are you new to the game?</h3>
            <button type="button" className="btn btn-light" onClick={() => setShow(true)}>HOW TO PLAY</button>
            {<Rules {...{show, setShow}} />}
            </div>
          </div>
        
          <div className='container' id='hall-fame'>
            <div className='row hall-fame-title'>
              <h2>RUMMIKLUB HALL OF FAME</h2>
            </div>

            <div className='row' id='hall-fame-body'>
              <div className="col-3">
                <img src={bz} alt='bek head shot' width="90" />
                <h5>Bek Zhuma</h5>
                <a role="button" className="btn btn-dark" href='https://www.linkedin.com/in/beknazar1/' target="_blank" rel="noopener noreferrer">MORE INFO</a>
              </div>
              <div className="col-3">
                <img src={km} alt='kev head shot' width="90" />
                <h5>Kevin Maguire</h5>
                <a role="button" className="btn btn-dark" href='https://www.linkedin.com/in/kevin-maguire-ii/' target="_blank" rel="noopener noreferrer">MORE INFO</a>
              </div>
              <div className="col-3">
                <img src={sb} alt='saumya head shot' width="90" />
                <h5>Saumya Bajracharya</h5>
                <a role="button" className="btn btn-dark" href='https://www.linkedin.com/in/ssbajracharya/' target="_blank" rel="noopener noreferrer">MORE INFO</a>
              </div>
              <div className="col-3">
                <img src={js} alt='justin head shot' width="90" />
                <h5>Justin Savage</h5>
                <a role="button" className="btn btn-dark" href='https://www.linkedin.com/in/justsav/' target="_blank" rel="noopener noreferrer">MORE INFO</a>
              </div>
            </div>
          </div>
          <div id='copyright'>
          <h5>Copyright 2020, RummiKlub LLC</h5>
          </div>
        </div>


    );
}

export default Home