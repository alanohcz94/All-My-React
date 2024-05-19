import React, { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ProtectoredRoute = ({ children }) => {
  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  // 2. if no authenticated user, redirect to login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isLoading, isAuthenticated]);

  // 3. while loading spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there is user render dashboard
  if (isAuthenticated) return children;
};

export default ProtectoredRoute;
