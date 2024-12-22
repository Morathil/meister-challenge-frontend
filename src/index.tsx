import React, { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import App from 'views/App'
import { ApolloProvider } from '@apollo/client';
import apolloClient from 'src/services/apollo-client'

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </StrictMode>
)