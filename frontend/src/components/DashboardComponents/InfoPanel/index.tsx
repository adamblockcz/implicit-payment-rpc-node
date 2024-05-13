import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { SxProps } from "@mui/system";
import { SvgIconProps } from "@mui/material/SvgIcon";

interface TransactionProps {
  icon: React.ReactElement<SvgIconProps>;
  description: string;
  number: string;
  color?: string;
}

export default function InfoPanel({ icon, description, number, color }: TransactionProps){
    return (
        <Box sx={{ display: 'inline-flex', alignItems: 'center', marginTop: '50px', marginBottom: '50px' }}>
            
          <Avatar sx={{ backgroundColor: '#536DFE', marginRight: '68px', width: '80px', height: '80px' }}>
            {React.cloneElement(icon, { sx: { fontSize: 50, color: color || 'inherit' } })}
          </Avatar>
          
          <Box sx={{ textAlign: 'left' }}>
            <Typography variant="body1" sx={{ fontSize: '35px', fontWeight: 'bold' }}>
              {number}
            </Typography>
            
            <Typography variant="body1" sx={{ fontSize: '20px' }}>
              {description}
            </Typography>
          </Box>
        </Box>
    );
}
