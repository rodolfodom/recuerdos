import { SpeedDial, SpeedDialAction } from "@mui/material";
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import FolderIcon from '@mui/icons-material/Folder';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';



export default function CustomeSpeedDial({openFolderModal, openImageModal}) {

    const actions = [
        { icon: <FolderIcon fontSize="large" color="primary"/>, name: 'Carpeta', onClick: openFolderModal},
        { icon: <InsertPhotoIcon fontSize="large" color="primary"/>, name: 'Imagen', onClick: openImageModal}
    ];



    return (
        <SpeedDial
            ariaLabel="Agregar elemento"
            sx={{ position: 'fixed', bottom: 50, right: 300 }}
            icon={<SpeedDialIcon />}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    sx={{padding: 3}}
                    onClick={()=>{
                        action.onClick(true)
                    }}
                />
            ))}
        </SpeedDial>
    )
}