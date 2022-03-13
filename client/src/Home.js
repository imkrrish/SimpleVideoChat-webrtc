import React from 'react';
import AppBar from './components/AppBar/AppBar';
import Footer from './components/Footer/Footer';
import UserVideo from './components/Video/UserVideo';

const Home = () => {
  return <>
    <AppBar />
    <UserVideo />
    <Footer />
  </>;
};

export default Home;