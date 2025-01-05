import React from 'react';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#808080',
        color: '#808080',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            content: '""',
        },
    }
}));



export default function OfflineUserBadge({ userData }) {
  return (
    <div>
              <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
              >
                  <Avatar alt="Remy Sharp" src={userData.profileURL} sx={{ width: 60, height: 60 }} />
              </StyledBadge>
    </div>
  )
}
