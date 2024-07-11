import React from 'react'
import { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import SendIcon from '@mui/icons-material/Send';


const UrlShortener = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/get-shortened-urls")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const shortenUrl = () => {
    const url = document.getElementById('url').value;
    fetch("http://localhost:3001/shorten-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url }),
    })
      .then(() => {
        fetch("http://localhost:3001/get-shortened-urls")
          .then((response) => response.json())
          .then((data) => setData(data));
      });
  }

  return (
    <Container maxWidth="md">
    <h1>URL Shortener</h1>
    <Container>
    <form>

      <TextField fullWidth id="url" label="Enter URL" variant="outlined" />
      <div style={{height: 20}}></div>
      <Button variant="contained" color="primary" endIcon={<SendIcon />} size="medium"
  onClick={shortenUrl}
>
  Shorten
</Button>


    </form>
    </Container>
    <h2>Shortened URLs</h2>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="left">Original URL</TableCell>
          <TableCell align="left">Shortened URL</TableCell>
          <TableCell align="left">Clicks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {data.map((url) => (
          <tr>
            <TableCell align="left">{url.full_url}</TableCell>
            <TableCell align="left"><a href={url.short_url}>{url.short_url}</a></TableCell>
            <TableCell align="left">{url.url_clicks}</TableCell>
          </tr>
        ))}
      </TableBody>
    </Table>
    </TableContainer>
  </Container>
  )
}

export default UrlShortener