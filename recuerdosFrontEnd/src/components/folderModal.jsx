import { Dialog, DialogActions, DialogContent, Button, DialogTitle, DialogContentText, TextField, CircularProgress } from "@mui/material"
import createDirectory from "../services/createDirectory"
import { useCookies } from "react-cookie"
import { useState, useRef } from "react"

export default function FolderModal({ open, setOpen, currentDirectory}) {
  //console.log("Este es el direcotio actuak: " + currentDirectory)
  const [cookies] = useCookies(['authToken', 'rootDirectory']);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [directoryName, setDirectoryName] = useState('');

  const handleClose = () => {
    setOpen(false)
  }

  const handleCreate = async () => {
    if(directoryName === '' || directoryName === null){
      inputRef.current.focus()
      return
    }

    const newDirectory = {
      name: directoryName,
      containerDirectoryID: currentDirectory
    }

    setLoading(true)
    try{
      const response = await createDirectory(newDirectory, cookies.authToken)
      if(!response.success){
        throw new Error(response.message)
      }
    }catch(error){
      //console.log(error)
    }finally{
      setLoading(false)
    }
    
    setOpen(false)
    setDirectoryName('')
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Nueva Carpeta</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Crea una nueva capreta para organizar tus fotos.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="nombre de la nueva carpeta"
          type="text"
          fullWidth
          variant="standard"
          onChange={(event) => setDirectoryName(event.target.value)}
          value={directoryName}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleCreate} disabled={loading} >{loading? <CircularProgress size={20}/> : "Crear"}</Button>
      </DialogActions>
    </Dialog>
  )
}