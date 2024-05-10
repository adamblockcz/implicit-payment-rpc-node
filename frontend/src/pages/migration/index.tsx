import React, { useState } from "react";
import { Box } from "@mui/material";
import { styled } from '@mui/system';
import Menus from '@/components/Dashboard/Menus';

const RootContainer = styled(Box)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  background-image: radial-gradient(#c0c0c0 1px, transparent 1px),
    radial-gradient(#c0c0c0 1px, transparent 1px);
  background-size: 20px 20px;
`;
const Dashboard: React.FC = () => {

  return (
    <RootContainer>
        <Menus></Menus>
        Migration
    </RootContainer>
  );
};

export default Dashboard;