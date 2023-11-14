import { Container, TextField } from "@mui/material";
import MenuAppBar from "./appbar";
import UploadPhotoForm from "./uploadPhotoForm";

export default function UserPage(){
    return(
        <>
            <MenuAppBar/>
            <UploadPhotoForm/>
        </>
    )
}