import { useEffect, useState } from "react"
import CustomeSpeedDial from "./speedDial"
import { Container, CircularProgress, Typography, Card, CardMedia, CardContent, Breadcrumbs, Link } from "@mui/material"
import ImageModal from "./imageModal";
import FolderModal from "./folderModal";
import getDirectoryElements from "../services/getDirectoryElements";
import { useCookies } from "react-cookie";
import folderIcon from "../assets/icons/folder.png"
import FolderIcon from '@mui/icons-material/Folder';

export default function GalleryView({ currentDirectory, changeDirectory }) {
    //console.log(currentDirectory)
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)
    const [directories, setDirectories] = useState([])
    const [error, setError] = useState(false)
    const [openImageModal, setOpenImageModal] = useState(false)
    const [openFolderModal, setOpenFolderModal] = useState(false)
    const [cookies, setCookie] = useCookies(['authToken', 'rootDirectory']);
    const [route, setRoute] = useState([{ name: 'Mis recuerdos', id: cookies.rootDirectory }])

    useEffect(() => {

        const lookForItems = async () => {
            setLoading(true)
            try {
                const response = await getDirectoryElements(currentDirectory, cookies.authToken)
                //console.log(response.data);
                if (!response.success) {
                    throw new Error(response.message)
                }

                setDirectories(response.data.directories)
                setImages(response.data.images)
            } catch (error) {
                setError(true)
                // console.log(error);
            } finally {
                setLoading(false)
            }

        };

        lookForItems();

    }, [currentDirectory])


    if (loading) {
        return (
            <Container maxWidth="md" sx={{ minHeight: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', py: '4rem' }}>
                <CircularProgress />
            </Container>
        )
    } else if (images.length === 0 && directories.length === 0) {

        return (
            <Container maxWidth="md" sx={{ minHeight: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', py: '4rem' }}>
                <Breadcrumbs aria-label="breadcrumb" sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', mb: '1rem' }}>
                    {
                        route.map((directory) => {
                            return (
                                <Link underline="hover" key={directory.id} color="inherit" href="#" onClick={() => changeDirectory(directory.id)}>
                                    {directory.name}
                                </Link>
                            )
                        })
                    }
                </Breadcrumbs>
                <Typography variant="h4" component="h2" gutterBottom sx={{display: 'block', width: '100%'}}>
                    Esta carpeta está vacía
                </Typography>
                <ImageModal open={openImageModal} setOpen={setOpenImageModal} currentDirectory={currentDirectory} />
                <FolderModal open={openFolderModal} setOpen={setOpenFolderModal} currentDirectory={currentDirectory} />
                <CustomeSpeedDial openFolderModal={setOpenFolderModal} openImageModal={setOpenImageModal} />
            </Container>
        )
    }


    return (

        <Container maxWidth="md" sx={{minHeight: '100%', position: 'relative', display: 'flex', alignContent: 'space-between', alignItems: 'stretch', flexWrap: 'wrap', p: '3rem', }}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', mb: '1rem' }}>
                {
                    route.map((directory) => {
                        return (
                            <Link underline="hover" key={directory.id} color="inherit" href="#" onClick={() => changeDirectory(directory.id)}>
                                {directory.name}
                            </Link>
                        )
                    })
                }
            </Breadcrumbs>
            {
                directories.map((directory) => {
                    return (
                        <Card key={directory.directoryID} sx={{ m: 0, p: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 2, m: 2, cursor: 'pointer', width: '170px', borderWidth: '0.5px', borderStyle: 'solid', borderColor: 'rgba(0,0,0,0)', ":hover": { backgroundColor: '#c0e6fa', boxSizing: 'border-box', borderColor: '#86d4fc' } }} onClick={() => changeDirectory(directory.directoryID)}>
                            <CardMedia
                                children={<FolderIcon sx={{ width: '100px', height: '100px' }} color="primary" />}
                                sx={{ width: '100px', height: '100px' }}
                            />
                            <CardContent sx={{ padding: 0, margin: 0 }}>
                                <Typography variant="body" align="center" color="text" sx={{ wordBreak: 'break-word', padding: 0, m: 0 }}>
                                    {directory.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    )
                })
            }
            <ImageModal open={openImageModal} setOpen={setOpenImageModal} currentDirectory={currentDirectory} />
            <FolderModal open={openFolderModal} setOpen={setOpenFolderModal} currentDirectory={currentDirectory} />
            <CustomeSpeedDial openFolderModal={setOpenFolderModal} openImageModal={setOpenImageModal} />
        </Container>
    )
}