
import { Box } from "@mui/material";
import MenuAppBar from "./appbar";
import GalleryView from "./galleryView";
import { useState } from "react";
import { useCookies } from "react-cookie";



export default function UserPage(){
    const [cookies, setCookie, removeCookie] = useCookies(['authToken', 'rootDirectory']);
    const [currentDirectory, setCurrentDirectory] = useState(cookies.rootDirectory)

    
    return(
        <Box minHeight={'100vh'}>
            <MenuAppBar/>
            <GalleryView currentDirectory={currentDirectory} changeDirectory={setCurrentDirectory}/>
        </Box>
    )
}