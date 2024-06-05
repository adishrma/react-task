import React, { useEffect, useState } from 'react';
import "./App.css";
import {Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";

const api = "https://jsonplaceholder.typicode.com/users"

const App = () => {
const [users, setUsers] = useState([]);
const [search, setSearch] = useState('');
const fetchUsers = async(url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    if(data.length > 0){
      setUsers(data)
    }
  } catch (error) {
    console.log(error);
  }
}

  useEffect( () => {
    fetchUsers(api);
  }, []);
  
  return <>
  <Container sx={{height: "104vh"}}>
  <Typography variant='h1' sx={{fontSize: 35, textAlign: 'center'}}>Personal Contacts ⚡ </Typography>
<form>
  <Box sx={{textAlign: 'center', mt:'16px', mb:'20px', mr:'40px'}}>
  <input type='text' placeholder='search a user' onChange={(e) => setSearch(e.target.value)} />
  </Box>
</form>
<Paper elevation={16}>
  <TableContainer component={Paper}>
    <Box sx={{
      width:{
        mobile: 0,
        tablet: 640,
        laptop: 1024,
        desktop: 1200,
      }
    }} >
  <Table sx={{minWidth: '650', bgcolor:'grey'}} aria-label="simple table">
  <TableHead>
  <TableRow sx={{bgcolor:'#232F34'}}>
      <TableCell sx={{color:'mediumturquoise'}} align='center'>Id</TableCell>
      <TableCell sx={{color:'mediumturquoise'}}  align='center'>Username</TableCell>
      <TableCell sx={{color:'mediumturquoise'}}  align='center'>Email</TableCell>
      <TableCell sx={{color:'mediumturquoise'}}  align='center'>Website</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
    {users.filter((user) => {
      return search.toLowerCase() === '' ? user : user.username.toLowerCase().includes(search);
    }).map((user) => {
      const {id, username, email, website} = user;

      return (
      <TableRow key={id}>
        <TableCell align='center'>{id}</TableCell>
        <TableCell align='center'>{username}</TableCell>
        <TableCell align='center'>{email}</TableCell>
        <TableCell align='center'>{website}</TableCell>
      </TableRow>
      )

    })}
    </TableBody>
    </Table>
    </Box>
  </TableContainer>
  </Paper>

    <Box
      sx={{
      textAlign:'center',
      mt:'20px',
        
      }}
    >
      <Button variant='contained' href="https://jsonplaceholder.typicode.com/users">
        Api Code ↩
      </Button>
    </Box>

  </Container>
  </>
}

export default App;