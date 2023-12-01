import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Typography, Card, CardMedia, IconButton, Box, Menu, MenuItem, Divider, Tooltip, ListItemIcon } from "@mui/material"
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import downloadImage from '../services/downloadImage';

export default function ImageCard({ image }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [cookies] = useCookies(['authToken']);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card
            onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#c0e6fa'
                e.currentTarget.style.borderColor = '#86d4fc'

            }
            }
            onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0)'
                e.currentTarget.style.borderColor = 'rgba(0,0,0,0)'

            }}
            sx={{ m: 0, p: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 2, m: 2, cursor: 'pointer', width: '170px', borderWidth: '0.5px', borderStyle: 'solid', borderColor: 'rgba(0,0,0,0)', position: 'relative' }}>
            <CardMedia
                children={<img src={image.url} alt={image.name} style={{ width: '100%', maxHeight: '150px', maxWidth: '100px' }} />}
                sx={{ width: '100px', height: '150px' }}
            />

            <Typography variant="body" align="center" color="text" sx={{ wordBreak: 'break-word', pt: 2, m: 0 }}>
                {image.name}
            </Typography>
            <Tooltip title="Más opciones" placement="top">
                <IconButton
                    size='small'
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="más"
                    color="primary"
                    sx={{
                        position: 'absolute',
                        top: '0',
                        right: '0'
                    }}
                    onClick={handleClick}
                    onMouseOver={(e) => {
                        e.stopPropagation()
                    }}>
                    <MoreVertIcon />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={()=>{
                    downloadImage(image.imageID, cookies.authToken)
                }}>
                    <ListItemIcon>
                        <CloudDownloadIcon fontSize="small" color='primary'/>
                    </ListItemIcon>
                    <Typography variant="body2">Descargar</Typography>
                </MenuItem>
            </Menu>
        </Card>
    )
}