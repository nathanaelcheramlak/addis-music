import React from 'react';
import SongList from './components/SongList';
import styled from '@emotion/styled';

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(to bottom right, #f8fafc, #e0f2fe, #e0e7ff);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Heading = styled.h1`
  text-align: center;
  color: #1e40af;
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const App = () => (
  <AppContainer>
    <Heading>Music Library</Heading>
    <SongList />
  </AppContainer>
);

export default App;
