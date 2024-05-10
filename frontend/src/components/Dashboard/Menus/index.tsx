import { LoggedInVerifier } from '@/components/LoggedInVerifier';
import LeftSideMenu from '@/components/Dashboard/LeftSideMenu';
import TopSideMenu from '@/components/Dashboard/TopSideMenu';

import React, { useState } from "react";
import { Box } from "@mui/material";
import { styled } from '@mui/system';

const drawerWidth = 240;

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
const Menus: React.FC = () => {
const [open, setOpen] = useState(false);
const [closed, setClosed] = useState(true);
  return (
    <div>
    <LoggedInVerifier />
    <TopSideMenu />
    <LeftSideMenu open={open} setOpen={setOpen} closed={closed} setClosed={setClosed} variant="permanent"/>
    </div>
  );
};

export default Menus;